'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AskAiIcon from './ask_ai_icon';
import { useSession } from 'next-auth/react'; // Import useSession
import { RATE_LIMIT } from '@/lib/constants'; // Import RATE_LIMIT

interface Message {
  role: 'user' | 'assistant';
  type: 'text' | 'code';
  content: string;
  language?: string;
}

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session, update } = useSession(); // Get session data and update function



  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const dismissWarning = () => {
    setShowWarning(false);
  };

  const handleTryCode = (code: string, language: string) => {
    localStorage.setItem('code-data', JSON.stringify({ code, language }));

    if (window.location.pathname === '/learn') {
      window.dispatchEvent(new CustomEvent('new-code-to-try'));
    } else {
      router.push('/learn');
    }

    setIsOpen(false);
  };

  const sendPromptToAI = async (promptContent: string) => {
    const userMessage: Message = { role: 'user', type: 'text', content: promptContent };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput(''); // Clear input only if it's from the input field
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages.map(m => ({role: m.role, content: m.content})) }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        let errorMessageContent = 'Sorry, I encountered an error.';

        try {
          const errorJson = JSON.parse(errorText);
          if (res.status === 429 && errorJson.message) {
            errorMessageContent = errorJson.message;
          }
        } catch (parseError) {
          // No need to log parse error as a separate console error, it will just result in generic message
        }
        const errorMessage: Message = { role: 'assistant', type: 'text', content: errorMessageContent };
        setMessages([...newMessages, errorMessage]);
        return; // Exit function after handling error
      }

      const data = await res.json();
      console.log("API Success Response Data:", data); // Log successful response data
      if (data.response) { // Check if response data exists
        const assistantMessage: Message = { role: 'assistant', ...data.response };
        setMessages([...newMessages, assistantMessage]);
        await update(); // Refresh the session to get updated dailyApiUses
      }
    } catch (error) {
      console.error("sendPromptToAI Catch Error:", error);
      const errorMessage: Message = { role: 'assistant', type: 'text', content: 'Sorry, I encountered an error.' };
      // This catch block will only be hit for network errors or unhandled exceptions before res.ok check.
      // If the error was an API response with res.ok === false, it's handled above.
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendPromptToAI(input);
    setInput(''); // Ensure input is cleared after submission
  };

  // New useEffect for listening to external events
  useEffect(() => {
    const handleOpenAiChat = (event: CustomEvent<{ prompt?: string }>) => {
      setIsOpen(true); // Open the chatbox
      if (event.detail?.prompt) {
        // If a prompt is provided, send it to the AI
        sendPromptToAI(event.detail.prompt);
      }
    };

    window.addEventListener('open-ai-chat', handleOpenAiChat as EventListener);

    return () => {
      window.removeEventListener('open-ai-chat', handleOpenAiChat as EventListener);
    };
  }, [messages]); // Add messages as a dependency to ensure sendPromptToAI has latest state

  // Calculate uses left
  const usesLeft = session?.user?.proStatus || session?.user?.role === 'admin'
    ? 'Unlimited'
    : Math.max(0, RATE_LIMIT - (session?.user?.dailyApiUses || 0));

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 z-[999]"
        aria-label="Toggle AI Chat"
      >
        <AskAiIcon />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-[32rem] bg-white rounded-lg shadow-2xl flex flex-col z-[999]">
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">AI Assistant</h3>
            <span className="text-sm bg-black rounded-md px-2 py-1">Uses Left: {usesLeft}</span> {/* Display uses left with styling */}
            <button onClick={toggleChat} className="text-white hover:text-gray-200" aria-label="Close Chat">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {showWarning && (
            <div className="bg-yellow-200 text-yellow-800 p-2 text-xs flex items-center justify-between">
              <span>This is AI-generated content. User responsibility applies.</span>
              <button onClick={dismissWarning} className="text-yellow-800 hover:text-yellow-900 ml-2" aria-label="Dismiss warning">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 p-3 rounded-lg max-w-[85%] ${
                msg.role === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-700 text-white mr-auto'
              }`}>
                {msg.type === 'code' ? (
                  <div>
                    <p className="text-sm font-semibold mb-2">Code block ({msg.language})</p>
                    <button
                      onClick={() => handleTryCode(msg.content, msg.language || 'plaintext')}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    >
                      Try Code
                    </button>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="my-2 p-3 rounded-lg bg-gray-200 mr-auto">
                <p className="text-sm">...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={isLoading}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}