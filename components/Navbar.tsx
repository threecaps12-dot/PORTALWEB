import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { label: "GORRAS", href: "/catalogo?cat=gorras" },
  { label: "ROPA", href: "/catalogo?cat=ropa" },
  { label: "COLECCIONES", href: "/catalogo?cat=colecciones" },
  { label: "DESTACADOS", href: "/catalogo?cat=destacados" },
];

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2 5h13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="21" r="1" fill="currentColor" />
      <circle cx="18" cy="21" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-obsidian/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/three-caps-logo.jpg"
            alt="Three Caps"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-display text-base tracking-wide text-obsidian hidden sm:inline">
            THREE <span className="text-crimson">CAPS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-obsidian/80 hover:text-crimson transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-obsidian">
          <button aria-label="Buscar" className="hover:text-crimson transition-colors">
            <SearchIcon />
          </button>
          <Link href="/carrito" aria-label="Carrito" className="relative hover:text-crimson transition-colors">
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-crimson text-cream text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
