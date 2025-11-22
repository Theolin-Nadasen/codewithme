import { NextApiRequest, NextApiResponse } from "next";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { Languages } from "../../app/learn/languages";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { drizzle_db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { FREE_DAILY_API_USES, PRO_USER_API_USES_MULTIPLIER } from "@/lib/constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await unstable_getServerSession(req, res, authOptions);
  console.log("Chat API - Session:", session);

  if (!session || !session.user || !session.user.id) { // Ensure session and user ID are present
    console.log("Chat API - Unauthorized: Missing session or user ID");
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { messages } = req.body;

    // Fetch the latest user data from the database
    const [dbUser] = await drizzle_db.select().from(users).where(eq(users.id, session.user.id));
    console.log("Chat API - DB User:", dbUser);

    if (!dbUser) {
        console.log("Chat API - Unauthorized: User not found in DB for ID:", session.user.id);
        return res.status(401).json({ message: 'Unauthorized: User not found in DB' });
    }

    if (dbUser.role !== 'admin') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const lastUseDate = dbUser.lastApiUseDate ? new Date(dbUser.lastApiUseDate) : new Date(0);
      lastUseDate.setHours(0, 0, 0, 0);

      if (lastUseDate.getTime() < today.getTime()) {
        dbUser.dailyApiUses = 0; // Reset daily uses if it's a new day
      }
      
      const limit = dbUser.proStatus 
        ? FREE_DAILY_API_USES * PRO_USER_API_USES_MULTIPLIER 
        : FREE_DAILY_API_USES;

      if (dbUser.dailyApiUses >= limit) {
        return res.status(429).json({ message: 'Rate limit exceeded. Please try again tomorrow.' });
      }

      const newDailyApiUses = dbUser.dailyApiUses + 1;
      await drizzle_db.update(users).set({ dailyApiUses: newDailyApiUses, lastApiUseDate: new Date() }).where(eq(users.id, dbUser.id));
    }

    const formattedPreviousMessages = messages.slice(0, -1).map((msg: any) => {
      if (msg.role === "user") {
        return new HumanMessage({ content: msg.content });
      }
      if (msg.role === "assistant") {
        return new AIMessage({ content: msg.content });
      }
      // Fallback for any other roles
      return new HumanMessage({ content: msg.content });
    });

    const currentMessageContent = messages[messages.length - 1].content;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a helpful AI assistant. When providing code, always wrap it in a markdown code block with the language specified. For example: ```javascript\nconsole.log('hello');\n```"],
      new MessagesPlaceholder("history"),
      ["human", "{input}"],
    ]);

    const model = new ChatOpenAI({
      modelName: "mistralai/mistral-7b-instruct:free",
      apiKey: process.env.AI_KEY,
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
    });

    const chain = prompt.pipe(model);

    const response = await chain.invoke({
      history: formattedPreviousMessages,
      input: currentMessageContent,
    }, { timeout: 60000 });

    const responseContent = response.content as string;
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/;
    const codeMatch = responseContent.match(codeBlockRegex);

    let structuredResponse;

    if (codeMatch) {
      // It's code, so don't clean it.
      const language = codeMatch[1].toLowerCase() || 'plaintext';
      const supportedLanguages = Languages.map(l => l.name.toLowerCase());

      if (supportedLanguages.includes(language) || language === 'plaintext') {
        structuredResponse = {
          type: 'code',
          language: language,
          content: codeMatch[2].trim(),
        };
      } else {
        structuredResponse = {
          type: 'text',
          content: `I'm sorry, I can generate code in "${language}", but we don't support it in our editor yet. Please choose one of the supported languages: ${supportedLanguages.join(', ')}.`,
        };
      }
    } else {
      // It's not code, so clean it.
      const cleanedContent = responseContent.replace(/<s>|\[OUT\]|\[\/OUT\]|<\/s>/g, '').trim();
      structuredResponse = {
        type: 'text',
        content: cleanedContent,
      };
    }

    res.status(200).json({ response: structuredResponse });

  } catch (error: any) {
    console.error("Error in chat API:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
