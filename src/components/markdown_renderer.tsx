'use client';

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FC, useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MarkdownRendererProps {
    content: string;
}

// Initialize mermaid with custom config
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    flowchart: {
        curve: 'basis',
        padding: 20
    }
});

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ content }) => {
    const mermaidRef = useRef<HTMLDivElement>(null);
    const [mermaidDiagrams, setMermaidDiagrams] = useState<{ id: string; code: string }[]>([]);

    useEffect(() => {
        // Extract mermaid code blocks from content
        const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
        const matches: { id: string; code: string }[] = [];
        let match;
        let index = 0;
        
        while ((match = mermaidRegex.exec(content)) !== null) {
            matches.push({
                id: `mermaid-${index}-${Date.now()}`,
                code: match[1].trim()
            });
            index++;
        }
        
        setMermaidDiagrams(matches);
    }, [content]);

    useEffect(() => {
        // Render mermaid diagrams
        if (mermaidDiagrams.length > 0 && mermaidRef.current) {
            mermaid.run({
                querySelector: '.mermaid'
            }).catch((err) => {
                console.error('Mermaid rendering error:', err);
            });
        }
    }, [mermaidDiagrams]);

    // Replace mermaid code blocks with placeholders
    let processedContent = content;
    mermaidDiagrams.forEach((diagram, index) => {
        processedContent = processedContent.replace(
            new RegExp(`\\s*\`\`\`mermaid\\s*\n${diagram.code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\n\`\`\`\\s*`),
            `\n<div id="${diagram.id}" class="mermaid">${diagram.code}</div>\n`
        );
    });

    return (
        <div className="markdown-content space-y-4" ref={mermaidRef}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => <h1 {...props} />,
                    h2: ({ node, ...props }) => <h2 {...props} />,
                    h3: ({ node, ...props }) => <h3 {...props} />,
                    img: ({ node, ...props }) => (
                        <img
                            {...props}
                            className="mx-auto block w-full max-w-full h-auto rounded-lg shadow-md my-8"
                        />
                    ),
                    code: ({ node, className, children, ...props }) => {
                        const isMermaid = className?.includes('language-mermaid');
                        if (isMermaid) {
                            return null; // Mermaid is handled separately
                        }
                        return <code className={className} {...props}>{children}</code>;
                    }
                }}
            >
                {processedContent}
            </ReactMarkdown>
            {/* Render mermaid diagrams after markdown */}
            {mermaidDiagrams.map((diagram) => (
                <div key={diagram.id} className="my-8 overflow-x-auto">
                    <div className="mermaid" data-diagram-id={diagram.id}>
                        {diagram.code}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MarkdownRenderer;