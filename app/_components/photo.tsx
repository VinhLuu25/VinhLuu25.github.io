import Image from "next/image";
import type { Photo as PhotoData } from "../content";

type Props = {
  photo: PhotoData;
  sizes: string;
  label: string;
  hint: string;
  eager?: boolean;
};

export function Photo({ photo, sizes, label, hint, eager }: Props) {
  if (photo.src) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        quality={90}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="object-cover"
        style={{ objectPosition: photo.position ?? "50% 50%" }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Chỗ trống cho ảnh: ${photo.alt}`}
      className="fpo absolute inset-0 flex items-center justify-center"
    >
      <div className="absolute inset-3 border border-dashed border-burgundy/25 sm:inset-4" />
      <div className="relative px-6 text-center">
        <p className="font-display text-5xl italic text-burgundy/35 sm:text-6xl">
          FPO
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-burgundy/70">
          {label}
        </p>
        <p className="mt-1 font-mono text-[11px] text-ink-soft/80">
          public/photos/{hint}
        </p>
      </div>
    </div>
  );
}
