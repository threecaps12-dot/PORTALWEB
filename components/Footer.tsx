"use client";

import Image from "next/image";
import Link from "next/link";
import { INSTAGRAM_HANDLE, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-obsidian text-cream/70 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          {/* Acceso discreto al panel admin: sin indicio visual, solo el logo de siempre */}
          <Link href="/admin" className="inline-flex items-center mb-4">
            <Image
              src="/brand/three-caps-wordmark.png"
              alt="Three Caps"
              width={1942}
              height={809}
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>
        <div>
          <h4 className="text-cream mb-3 tracking-wide">{t("footer.store")}</h4>
          <ul className="space-y-2">
            <li>{t("footer.gorras")}</li>
            <li>{t("footer.ropa")}</li>
            <li>{t("footer.colecciones")}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream mb-3 tracking-wide">{t("footer.help")}</h4>
          <ul className="space-y-2">
            <li>{t("footer.shipping")}</li>
            <li>{t("footer.returns")}</li>
            <li>{t("footer.contact")}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream mb-3 tracking-wide">{t("footer.follow")}</h4>
          <ul className="space-y-2">
            <li>
              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-crimson transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-crimson transition-colors"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Firma de autoría LEGION Studio — sello discreto, no estilo dominante */}
      <div className="border-t border-cream/10 py-4 text-center text-[11px] tracking-[0.15em] text-cream/40">
        {t("footer.forgedBy")}
      </div>
    </footer>
  );
}
