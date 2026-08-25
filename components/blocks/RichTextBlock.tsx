import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-slate-700 leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-slate-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-400 pl-5 italic text-slate-600 my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
  },
};

interface RichTextBlockProps {
  content: TypedObject[];
}

export default function RichTextBlock({ content }: RichTextBlockProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-2xl mx-auto prose prose-slate">
        <PortableText value={content} components={components} />
      </div>
    </section>
  );
}
