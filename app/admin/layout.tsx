import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

const NAV = [
  { label: "Resumen", href: "/admin" },
  { label: "Pedidos", href: "/admin/pedidos" },
  { label: "Productos", href: "/admin/productos" },
  { label: "Inventario", href: "/admin/inventario" },
  { label: "Mi Perfil", href: "/admin/perfil" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // El login (fuera de este layout de navegación) no pasa por aquí;
  // el resto de /admin/* ya está garantizado con sesión por el middleware.
  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-cream flex">
      <aside className="w-56 bg-obsidian text-cream/80 min-h-screen p-6 flex flex-col">
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

        <div className="mt-auto pt-6 border-t border-cream/10">
          <p className="text-cream/40 text-xs mb-2 truncate">{user.email}</p>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
