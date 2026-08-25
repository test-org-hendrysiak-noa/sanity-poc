import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

interface ImageBlockProps {
  image: SanityImageSource;
  alt: string;
  caption?: string;
}

export default function ImageBlock({ image, alt, caption }: ImageBlockProps) {
  const src = urlFor(image).width(1200).auto("format").url();

  return (
    <section className="py-16 px-6">
      <figure className="max-w-4xl mx-auto">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
          <Image src={src} alt={alt} fill className="object-cover" />
        </div>
        {caption && (
          <figcaption className="mt-4 text-center text-sm text-slate-500">
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
