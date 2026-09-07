"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

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

export default function ShippingInfo() {
  const { t } = useLanguage();

  const tiers = [
    { label: t("shipping.tier1Label"), desc: t("shipping.tier1Desc"), price: "$40" },
    { label: t("shipping.tier2Label"), desc: t("shipping.tier2Desc"), price: "$50" },
    { label: t("shipping.tier3Label"), desc: t("shipping.tier3Desc"), price: "$45", highlight: true },
  ];

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
            {t("shipping.bubbleIntro")}{" "}
            <span className="text-crimson font-bold">{t("shipping.bubbleHighlight1")}</span>
            {t("shipping.bubbleMid")}{" "}
            <span className="text-crimson font-bold">{t("shipping.bubbleHighlight2")}</span>
            {t("shipping.bubbleEnd")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 text-gold">
        <TruckIcon />
        <h2 className="font-display text-cream text-base md:text-lg tracking-[0.15em]">
          {t("shipping.title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tiers.map((tier) => (
          <div
            key={tier.label}
            className={`relative p-4 border ${
              tier.highlight ? "border-gold bg-gold/5" : "border-cream/15"
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-2.5 left-4 bg-gold text-obsidian text-[10px] font-bold tracking-widest px-2 py-0.5">
                {t("shipping.bestPrice")}
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
