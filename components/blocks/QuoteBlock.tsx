interface QuoteBlockProps {
  quote: string;
  author?: string;
  role?: string;
}

export default function QuoteBlock({ quote, author, role }: QuoteBlockProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <svg
          className="mx-auto mb-6 text-indigo-300 w-12 h-12"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <blockquote className="text-2xl font-medium text-slate-800 leading-relaxed mb-8">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {(author || role) && (
          <footer>
            {author && (
              <span className="block text-slate-900 font-semibold">{author}</span>
            )}
            {role && (
              <span className="block text-slate-500 text-sm mt-1">{role}</span>
            )}
          </footer>
        )}
      </div>
    </section>
  );
}
