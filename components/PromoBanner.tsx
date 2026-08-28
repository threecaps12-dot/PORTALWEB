import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export type PromoTile = {
  imageUrl: string;
  title: string;
  subtitle: string;
  href: string;
};

export default function PromoBanner({ tiles }: { tiles: [PromoTile, PromoTile] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {tiles.map((tile, i) => (
        <Reveal key={tile.href} delay={i * 120}>
          <Link
            href={tile.href}
            className="group relative block aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-obsidian"
          >
            <Image
              src={tile.imageUrl}
              alt={tile.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <span className="text-gold text-xs tracking-[0.2em] mb-2">{tile.subtitle}</span>
              <h3 className="font-display text-cream text-2xl md:text-3xl leading-tight">
                {tile.title}
              </h3>
              <span className="mt-3 inline-block w-fit text-cream text-xs tracking-widest border-b border-cream/40 pb-1 group-hover:border-crimson group-hover:text-crimson transition-colors">
                VER COLECCIÓN
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </section>
  );
}
