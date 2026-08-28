import Link from "next/link";
import Image from "next/image";

const NAV = [
  { label: "Resumen", href: "/admin" },
  { label: "Pedidos", href: "/admin/pedidos" },
  { label: "Inventario", href: "/admin/inventario" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex">
      {/* Nota de implementación: este layout debe estar protegido por
          middleware que verifique sesión + fila en admin_users (Supabase Auth).
          Ver docs/deployment-checklist.md */}
      <aside className="w-56 bg-obsidian text-cream/80 min-h-screen p-6">
        <div className="flex items-center gap-2.5 mb-8">
          <Image
            src="/brand/three-caps-logo.png"
            alt="Three Caps"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <p className="font-display text-cream text-sm tracking-wide">ADMIN</p>
        </div>
        <nav className="space-y-3 text-sm">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="block hover:text-cream transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
