import Image from "next/image";

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 4h13v11H1z" strokeLinejoin="round" />
      <path d="M14 8h4l4 4v3h-8z" strokeLinejoin="round" />
      <circle cx="5.5" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </svg>
  );
}

type Tier = {
  label: string;
  desc: string;
  price: string;
  highlight?: boolean;
};

const TIERS: Tier[] = [
  { label: "PRECIO REGULAR", desc: "Recoges tú, sin envío", price: "$40" },
  { label: "1 UNIDAD", desc: "Envío a cualquier estado de USA", price: "$50" },
  { label: "2+ UNIDADES", desc: "Envío incluido, precio por unidad", price: "$45", highlight: true },
];

export default function ShippingInfo() {
  return (
    <div className="bg-obsidian border border-gold/20 p-6 md:p-8 mb-8">
      <div className="flex items-end gap-3 sm:gap-5 mb-6">
        <Image
          src="/brand/mascot.png"
          alt="Mascota Three Caps"
          width={220}
          height={330}
          className="w-24 sm:w-32 h-auto shrink-0 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
          priority={false}
        />

        <div className="relative bg-cream text-obsidian rounded-2xl rounded-bl-sm px-4 py-3 mb-2">
          <span className="absolute -left-2 bottom-3 w-4 h-4 bg-cream rotate-45 rounded-[2px]" />
          <p className="text-xs sm:text-sm leading-snug font-medium">
            ¡Manda ese pedido, mi gente! Envío a todo USA. Si llevas{" "}
            <span className="text-crimson font-bold">2 o más piezas</span>, te sale a{" "}
            <span className="text-crimson font-bold">$45 c/u con envío incluido</span>.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 text-gold">
        <TruckIcon />
        <h2 className="font-display text-cream text-base md:text-lg tracking-[0.15em]">
          ENVÍOS A TODO USA
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TIERS.map((tier) => (
          <div
            key={tier.label}
            className={`relative p-4 border ${
              tier.highlight ? "border-gold bg-gold/5" : "border-cream/15"
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-2.5 left-4 bg-gold text-obsidian text-[10px] font-bold tracking-widest px-2 py-0.5">
                MEJOR PRECIO
              </span>
            )}
            <p className="text-cream/50 text-[11px] tracking-widest mb-1">{tier.label}</p>
            <p className="font-display text-cream text-2xl mb-1">{tier.price}</p>
            <p className="text-cream/60 text-xs leading-snug">{tier.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
