import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

export function urlFor(source: SanityImageSource) {
  const builder = createImageUrlBuilder({ projectId, dataset });
  return builder.image(source);
}
