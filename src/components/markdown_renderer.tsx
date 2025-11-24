'use client';

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Assuming we want GFM support
import { FC } from "react";

interface MarkdownRendererProps {
    content: string;
    // Add any other props you might want to pass to ReactMarkdown
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <div className="markdown-content space-y-4">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => <h1 {...props} />,
                    img: ({ node, ...props }) => (
                        <img
                            {...props}
                            className="mx-auto block w-full max-w-full h-auto rounded-lg shadow-md my-8"
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;