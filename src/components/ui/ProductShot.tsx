import Image from "next/image";
import type { ProductImage } from "@/config/media";

/** Real product screenshot (registered in src/config/media.ts). Lazy-loaded below the fold. */
export function ProductShot({ image }: { image: ProductImage }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-float">
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes="(min-width: 1024px) 560px, 100vw"
        className="block h-auto w-full"
      />
    </div>
  );
}
