import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { Languages } from "@/app/learn/languages"; // Adjusted path
import { createClient } from "@/lib/supabase/server";
import { drizzle_db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { FREE_DAILY_API_USES, PRO_USER_API_USES_MULTIPLIER } from "@/lib/constants";

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { messages } = await request.json();

        // Fetch the latest user data from the database
        const [dbUser] = await drizzle_db.select().from(users).where(eq(users.id, user.id));

        if (!dbUser) {
            return NextResponse.json({ message: 'Unauthorized: User not found in DB' }, { status: 401 });
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
                return NextResponse.json({ message: 'Rate limit exceeded. Please try again tomorrow.' }, { status: 429 });
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
            const cleanedContent = responseContent.replace(/<s>|\[OUT\]|\[\/OUT\]|<\/s>/g, '').trim();
            structuredResponse = {
                type: 'text',
                content: cleanedContent,
            };
        }

        return NextResponse.json({ response: structuredResponse });

    } catch (error: any) {
        console.error("Error in chat API:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
