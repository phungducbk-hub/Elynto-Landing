import Image from "next/image";
import type { ProductImage } from "@/config/media";
import { ProductSurface } from "./ProductSurface";

/** Real product screenshot (registered in src/config/media.ts). Lazy-loaded below the fold. */
export function ProductShot({ image }: { image: ProductImage }) {
  return (
    <ProductSurface>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes="(min-width: 1024px) 760px, 100vw"
        className="block h-auto w-full"
      />
    </ProductSurface>
  );
}
