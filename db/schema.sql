-- LEGION Studio | Sr. Pérez e-commerce
-- Schema para Supabase (Postgres)

create extension if not exists "uuid-ossp";

-- ============ CATÁLOGO ============

create table collections (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  created_at timestamptz default now()
);

create table products (
  id uuid primary key default uuid_generate_v4(),
  collection_id uuid references collections(id) on delete set null,
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),        -- anclaje de precio ("antes/ahora")
  category_label text,                   -- etiqueta de card: "MLB", "URBAN", "EDICIÓN LIMITADA"
  is_featured boolean default false,     -- "Recomendados de la semana"
  status text default 'active' check (status in ('active','draft','archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order int default 0
);

create table product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  size text not null,                    -- S/M, M/L, etc.
  color text,
  sku text unique not null,
  stock int default 0,
  price_override numeric(10,2)           -- null = usa products.price
);

-- ============ CARRITO ============

create table carts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  session_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table cart_items (
  id uuid primary key default uuid_generate_v4(),
  cart_id uuid references carts(id) on delete cascade,
  variant_id uuid references product_variants(id),
  quantity int not null default 1
);

-- ============ PEDIDOS ============
-- Ajuste acordado: no se integra checkout de pasarela completo por ahora.
-- El pedido se cierra por WhatsApp/Instagram; PayPal es un botón/link visible.
-- El admin confirma el pago manualmente desde el panel.

create table orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  customer_name text,
  customer_email text,
  customer_phone text,
  shipping_address jsonb,
  subtotal numeric(10,2),
  shipping_cost numeric(10,2) default 0,
  total numeric(10,2),
  status text default 'pending_whatsapp' check (
    status in ('pending_whatsapp','awaiting_payment','paid','fulfilled','cancelled')
  ),
  payment_method text check (payment_method in ('paypal','whatsapp_manual','instagram_manual')),
  payment_reference text,                -- texto libre: nota del admin, link de pago, etc.
  closed_via text check (closed_via in ('whatsapp','instagram','site')),
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  variant_id uuid references product_variants(id),
  quantity int not null,
  unit_price numeric(10,2) not null      -- precio congelado al momento del pedido
);

-- ============ ADMIN ============

create table admin_users (
  id uuid primary key references auth.users(id),
  role text default 'admin',
  created_at timestamptz default now()
);

-- ============ ROW LEVEL SECURITY ============

alter table products enable row level security;
alter table product_variants enable row level security;
alter table orders enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;

-- Lectura pública de catálogo (productos activos)
create policy "Catálogo público de lectura"
  on products for select
  using (status = 'active');

create policy "Variantes públicas de lectura"
  on product_variants for select
  using (true);

-- Solo admins pueden escribir catálogo/pedidos
create policy "Admins gestionan productos"
  on products for all
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create policy "Admins gestionan pedidos"
  on orders for all
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

-- Carrito: cada usuario ve/edita solo el suyo (o su session_id de invitado, manejado en app)
create policy "Usuarios gestionan su propio carrito"
  on carts for all
  using (auth.uid() = user_id);
