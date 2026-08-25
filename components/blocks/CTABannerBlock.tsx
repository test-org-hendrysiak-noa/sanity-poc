interface CTABannerBlockProps {
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonUrl?: string;
}

export default function CTABannerBlock({
  title,
  description,
  buttonLabel,
  buttonUrl,
}: CTABannerBlockProps) {
  return (
    <section className="py-20 px-6 bg-indigo-600">
      <div className="max-w-3xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        {description && (
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
            {description}
          </p>
        )}
        {buttonLabel && buttonUrl && (
          <a
            href={buttonUrl}
            className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full hover:bg-indigo-50 transition-colors duration-200 text-lg"
          >
            {buttonLabel}
          </a>
        )}
      </div>
    </section>
  );
}
