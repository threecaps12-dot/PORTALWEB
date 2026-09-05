-- Ejecutar en el SQL Editor de Supabase (proyecto threecaps).
-- Habilita RLS en admin_users y permite que cada usuario autenticado
-- lea únicamente su propia fila (necesario para que el middleware del
-- panel /admin verifique la sesión + el rol sin exponer la tabla completa).

alter table admin_users enable row level security;

create policy "Un admin puede leer su propia fila"
  on admin_users for select
  using (auth.uid() = id);
