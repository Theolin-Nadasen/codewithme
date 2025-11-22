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
                        // Apply styling to center and reduce image size
                        <img
                            {...props}
                            style={{ display: 'block', margin: '0 auto', maxWidth: '400px', height: 'auto' }}
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