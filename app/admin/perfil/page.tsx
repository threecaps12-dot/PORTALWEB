import { createClient } from "@/lib/supabase/server";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("role")
    .eq("id", user?.id ?? "")
    .maybeSingle();

  return (
    <div>
      <h1 className="font-display text-2xl text-obsidian mb-1">Mi Perfil</h1>
      <p className="text-obsidian/50 text-sm mb-6">Tu cuenta, tu clave. Cambia la contraseña genérica por una tuya.</p>

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white border border-obsidian/10 px-4 py-3">
          <p className="text-obsidian/40 text-xs tracking-wide mb-1">CORREO</p>
          <p className="text-obsidian text-sm">{user?.email}</p>
        </div>
        <span className="bg-gold/20 text-obsidian text-xs tracking-[0.15em] px-3 py-1.5 uppercase">
          {adminRow?.role ?? "admin"}
        </span>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
