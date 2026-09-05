-- Ejecutar en el SQL Editor de Supabase (proyecto threecaps).
-- Crea el bucket publico de Storage para fotos de producto (subidas desde
-- el panel admin) y los permisos: lectura publica, escritura solo admins.

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists product_images_bucket_select_public on storage.objects;
create policy product_images_bucket_select_public
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists product_images_bucket_admin_insert on storage.objects;
create policy product_images_bucket_admin_insert
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and exists (select 1 from admin_users where admin_users.id = auth.uid())
  );

drop policy if exists product_images_bucket_admin_delete on storage.objects;
create policy product_images_bucket_admin_delete
  on storage.objects for delete
  using (
    bucket_id = 'product-images'
    and exists (select 1 from admin_users where admin_users.id = auth.uid())
  );
