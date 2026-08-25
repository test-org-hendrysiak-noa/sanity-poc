import CTABannerBlock from "./blocks/CTABannerBlock";
import FeatureCardsBlock from "./blocks/FeatureCardsBlock";
import HeroBlock from "./blocks/HeroBlock";
import ImageBlock from "./blocks/ImageBlock";
import QuoteBlock from "./blocks/QuoteBlock";
import RichTextBlock from "./blocks/RichTextBlock";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = { _type: string; _key: string; [key: string]: any };

interface PageBuilderProps {
  blocks: Block[];
}

export default function PageBuilder({ blocks }: PageBuilderProps) {
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case "hero":
            return (
              <HeroBlock
                key={block._key}
                headline={block.headline}
                subtitle={block.subtitle}
                ctaLabel={block.ctaLabel}
                ctaUrl={block.ctaUrl}
              />
            );
          case "richText":
            return (
              <RichTextBlock key={block._key} content={block.content} />
            );
          case "imageBlock":
            return (
              <ImageBlock
                key={block._key}
                image={block.image}
                alt={block.alt}
                caption={block.caption}
              />
            );
          case "ctaBanner":
            return (
              <CTABannerBlock
                key={block._key}
                title={block.title}
                description={block.description}
                buttonLabel={block.buttonLabel}
                buttonUrl={block.buttonUrl}
              />
            );
          case "featureCards":
            return (
              <FeatureCardsBlock
                key={block._key}
                heading={block.heading}
                cards={block.cards ?? []}
              />
            );
          case "quote":
            return (
              <QuoteBlock
                key={block._key}
                quote={block.quote}
                author={block.author}
                role={block.role}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
