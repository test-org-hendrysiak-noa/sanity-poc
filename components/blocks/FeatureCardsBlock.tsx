interface Card {
  _key: string;
  icon?: string;
  title: string;
  body?: string;
}

interface FeatureCardsBlockProps {
  heading?: string;
  cards: Card[];
}

export default function FeatureCardsBlock({
  heading,
  cards,
}: FeatureCardsBlockProps) {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {heading && (
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card._key}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200"
            >
              {card.icon && (
                <span className="text-4xl block mb-4">{card.icon}</span>
              )}
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {card.title}
              </h3>
              {card.body && (
                <p className="text-slate-600 leading-relaxed">{card.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
