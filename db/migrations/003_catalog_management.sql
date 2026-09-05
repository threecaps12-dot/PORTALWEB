-- Ejecutar en el SQL Editor de Supabase (proyecto threecaps).
-- Version idempotente, sin comillas dobles y sin el patron
-- "from (values...) as x(...) join" que causaba error al pegar.

alter table products
  add column if not exists has_real_photo boolean not null default false;

alter table collections enable row level security;

drop policy if exists collections_select_public on collections;
create policy collections_select_public
  on collections for select
  using (true);

drop policy if exists collections_admin_all on collections;
create policy collections_admin_all
  on collections for all
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

alter table product_images enable row level security;

drop policy if exists product_images_select_public on product_images;
create policy product_images_select_public
  on product_images for select
  using (true);

drop policy if exists product_images_admin_all on product_images;
create policy product_images_admin_all
  on product_images for all
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

drop policy if exists product_variants_admin_all on product_variants;
create policy product_variants_admin_all
  on product_variants for all
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

insert into collections (name, slug, description) values
  ('Gorras', 'gorras', 'Gorras bordadas estilo streetwear'),
  ('Ropa', 'ropa', 'Hoodies y camisetas de la firma')
on conflict (slug) do nothing;

insert into products (collection_id, name, slug, description, price, compare_at_price, category_label, is_featured, has_real_photo, status)
values
  ((select id from collections where slug = 'gorras'), 'Gorra Concrete Jungle', 'gorra-concrete-jungle', 'Gorra negra con ilustracion bordada estilo grafiti, tipografia NY en relieve y acabado desgastado tipo tag.', 45, 60, 'EDICION LIMITADA', true, true, 'active'),
  ((select id from collections where slug = 'gorras'), 'Gorra Costa Azul LA', 'gorra-costa-azul-la', 'Gorra bordada con paleta azul inspirada en el skyline de Los Angeles.', 38, null, 'URBAN', false, true, 'active'),
  ((select id from collections where slug = 'gorras'), 'Gorra Cruz Gotica', 'gorra-cruz-gotica', 'Bordado gotico en relieve sobre base negra, acabado premium.', 42, null, 'STREETWEAR', false, true, 'active'),
  ((select id from collections where slug = 'gorras'), 'Gorra Barroco Negro', 'gorra-barroco-negro', 'Ornamentacion barroca bordada, edicion limitada.', 48, 62, 'EDICION LIMITADA', false, true, 'active'),
  ((select id from collections where slug = 'gorras'), 'Gorra Samurai Urbano', 'gorra-samurai-urbano', 'Ilustracion de samurai bordada con estetica urbana japonesa.', 40, null, 'URBAN', true, true, 'active'),
  ((select id from collections where slug = 'gorras'), 'Gorra Diamante LA', 'gorra-diamante-la', 'Bordado de diamante con brillo, edicion limitada.', 52, 68, 'EDICION LIMITADA', true, true, 'active'),
  ((select id from collections where slug = 'gorras'), 'Gorra Llamas Rosa NY', 'gorra-llamas-rosa-ny', 'Llamas rosas bordadas sobre base negra, tipografia NY.', 44, null, 'STREETWEAR', true, true, 'active'),
  ((select id from collections where slug = 'ropa'), 'Hoodie Three Caps', 'hoodie-three-caps', 'Hoodie pesado con logo Three Caps bordado en el pecho.', 68, null, 'STREETWEAR', false, false, 'active'),
  ((select id from collections where slug = 'ropa'), 'Camiseta Firma Bordada', 'camiseta-firma', 'Camiseta con firma Three Caps bordada, corte oversize.', 28, null, 'URBAN', false, false, 'active')
on conflict (slug) do nothing;

insert into product_images (product_id, url, alt_text, sort_order)
values
  ((select id from products where slug = 'gorra-concrete-jungle'), '/products/gorra-concrete-jungle.jpg', 'Gorra Concrete Jungle', 0),
  ((select id from products where slug = 'gorra-costa-azul-la'), '/products/gorra-costa-azul-la.jpg', 'Gorra Costa Azul LA', 0),
  ((select id from products where slug = 'gorra-cruz-gotica'), '/products/gorra-cruz-gotica.jpg', 'Gorra Cruz Gotica', 0),
  ((select id from products where slug = 'gorra-barroco-negro'), '/products/gorra-barroco-negro.jpg', 'Gorra Barroco Negro', 0),
  ((select id from products where slug = 'gorra-samurai-urbano'), '/products/gorra-samurai-urbano.jpg', 'Gorra Samurai Urbano', 0),
  ((select id from products where slug = 'gorra-diamante-la'), '/products/gorra-diamante-la.jpg', 'Gorra Diamante LA', 0),
  ((select id from products where slug = 'gorra-llamas-rosa-ny'), '/products/gorra-llamas-rosa-ny.jpg', 'Gorra Llamas Rosa NY', 0),
  ((select id from products where slug = 'hoodie-three-caps'), '/products/hoodie-three-caps.jpg', 'Hoodie Three Caps', 0),
  ((select id from products where slug = 'camiseta-firma'), '/products/camiseta-firma.jpg', 'Camiseta Firma Bordada', 0);

insert into product_variants (product_id, size, sku, stock)
values
  ((select id from products where slug = 'gorra-concrete-jungle'), 'Unica', 'TC-GORRA-001', 10),
  ((select id from products where slug = 'gorra-costa-azul-la'), 'Unica', 'TC-GORRA-002', 10),
  ((select id from products where slug = 'gorra-cruz-gotica'), 'Unica', 'TC-GORRA-003', 10),
  ((select id from products where slug = 'gorra-barroco-negro'), 'Unica', 'TC-GORRA-004', 10),
  ((select id from products where slug = 'gorra-samurai-urbano'), 'Unica', 'TC-GORRA-005', 10),
  ((select id from products where slug = 'gorra-diamante-la'), 'Unica', 'TC-GORRA-006', 10),
  ((select id from products where slug = 'gorra-llamas-rosa-ny'), 'Unica', 'TC-GORRA-007', 10),
  ((select id from products where slug = 'hoodie-three-caps'), 'S', 'TC-HOOD-008-S', 8),
  ((select id from products where slug = 'hoodie-three-caps'), 'M', 'TC-HOOD-008-M', 8),
  ((select id from products where slug = 'hoodie-three-caps'), 'L', 'TC-HOOD-008-L', 8),
  ((select id from products where slug = 'hoodie-three-caps'), 'XL', 'TC-HOOD-008-XL', 8),
  ((select id from products where slug = 'camiseta-firma'), 'S', 'TC-CAM-009-S', 14),
  ((select id from products where slug = 'camiseta-firma'), 'M', 'TC-CAM-009-M', 14),
  ((select id from products where slug = 'camiseta-firma'), 'L', 'TC-CAM-009-L', 14),
  ((select id from products where slug = 'camiseta-firma'), 'XL', 'TC-CAM-009-XL', 14)
on conflict (sku) do nothing;
