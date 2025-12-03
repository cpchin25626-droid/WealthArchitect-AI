import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

// A simplified markdown renderer to avoid heavy dependencies while keeping the file count low.
// It handles headers, bold text, lists, and paragraphs.
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let listBuffer: React.ReactNode[] = [];
  let inList = false;

  const flushList = (keyPrefix: string) => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-ul`} className="list-disc pl-6 mb-4 space-y-2 text-slate-700">
          {listBuffer}
        </ul>
      );
      listBuffer = [];
      inList = false;
    }
  };

  const processText = (text: string) => {
    // Process Bold (**text**)
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const key = `line-${index}`;
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(key);
      return;
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList(key);
      elements.push(<h3 key={key} className="text-xl font-bold text-slate-800 mt-6 mb-3 border-b pb-2 border-slate-200">{processText(trimmed.replace('### ', ''))}</h3>);
    } else if (trimmed.startsWith('## ')) {
      flushList(key);
      elements.push(<h2 key={key} className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-l-4 border-blue-600 pl-3">{processText(trimmed.replace('## ', ''))}</h2>);
    } else if (trimmed.startsWith('# ')) {
      flushList(key);
      elements.push(<h1 key={key} className="text-3xl font-bold text-slate-900 mt-4 mb-6">{processText(trimmed.replace('# ', ''))}</h1>);
    } 
    // Lists
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      inList = true;
      listBuffer.push(<li key={key}>{processText(trimmed.substring(2))}</li>);
    }
    else if (/^\d+\.\s/.test(trimmed)) {
       // Numbered list - treating as ul for simplicity or check if we want ol
       // For this simple parser, let's just make it a distinct block
       flushList(key);
       elements.push(<div key={key} className="mb-2 ml-4 text-slate-700 font-medium">{processText(trimmed)}</div>);
    }
    // Standard Paragraph
    else {
      flushList(key);
      elements.push(<p key={key} className="mb-4 text-slate-700 leading-relaxed">{processText(trimmed)}</p>);
    }
  });

  flushList('final');

  return <div className="prose max-w-none">{elements}</div>;
};