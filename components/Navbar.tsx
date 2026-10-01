"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2 5h13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="21" r="1" fill="currentColor" />
      <circle cx="18" cy="21" r="1" fill="currentColor" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // Cierra el menú móvil al cambiar de página
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const categories = [
    { label: t("nav.gorras"), href: "/catalogo?cat=gorras" },
    { label: "NEW ERA", href: "/catalogo?cat=new-era" },
    { label: t("nav.relojes"), href: "/catalogo?cat=relojes" },
    { label: t("nav.gafas"), href: "/catalogo?cat=gafas" },
    { label: t("nav.ropa"), href: "/catalogo?cat=ropa" },
    { label: t("nav.colecciones"), href: "/catalogo" },
    { label: t("nav.destacados"), href: "/catalogo?cat=destacados" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream/95 dark:bg-obsidian/95 backdrop-blur border-b border-obsidian/10 dark:border-cream/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center bg-obsidian rounded px-2.5 py-1.5">
          <Image
            src="/brand/three-caps-wordmark.png"
            alt="Three Caps"
            width={1942}
            height={809}
            className="h-7 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 font-display text-lg tracking-wide">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-obsidian/80 dark:text-cream/80 hover:text-crimson transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-obsidian dark:text-cream">
          <LanguageToggle />
          <ThemeToggle />
          <SearchBar />
          <Link href="/carrito" aria-label={t("nav.cart")} className="relative hover:text-crimson transition-colors">
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-crimson text-cream text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t("nav.menu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden hover:text-crimson transition-colors"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="lg:hidden border-t border-obsidian/10 dark:border-cream/10 bg-cream dark:bg-obsidian"
        >
          <ul className="max-w-7xl mx-auto px-4 md:px-8 py-2 font-display text-2xl tracking-wide">
            {categories.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-obsidian/80 dark:text-cream/80 hover:text-crimson transition-colors"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
