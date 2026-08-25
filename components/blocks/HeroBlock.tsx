interface HeroBlockProps {
  headline: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export default function HeroBlock({
  headline,
  subtitle,
  ctaLabel,
  ctaUrl,
}: HeroBlockProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 to-slate-700 text-white py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-6">
          {headline}
        </h1>
        {subtitle && (
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            {subtitle}
          </p>
        )}
        {ctaLabel && ctaUrl && (
          <a
            href={ctaUrl}
            className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200 text-lg"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
