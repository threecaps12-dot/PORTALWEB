# Three Caps — E-commerce (Sr. Pérez / LEGION Studio)

Streetwear urbano — gorras y ropa. Estructura tipo New Era Colombia,
identidad visual propia (Obsidian / Crimson / Gold sobre fondo claro),
logo real integrado (badge circular generado con Gemini Pro / Nano Banana),
apertura animada estilo grafiti sobre el logo, y cierre de venta dirigido
a WhatsApp / Instagram con PayPal como opción de pago visible.

## Estructura del proyecto

```
app/
  page.tsx                  → Home (anuncio, nav, hero, destacados)
  catalogo/page.tsx         → Catálogo con filtros
  producto/[slug]/page.tsx  → Ficha de producto
  carrito/page.tsx          → Carrito + cierre por WhatsApp/Instagram
  admin/                    → Panel administrativo
    page.tsx                → Resumen / reportes
    pedidos/page.tsx        → Gestión de pedidos
    inventario/page.tsx     → Catálogo e inventario
components/                 → Navbar, Hero, ProductCard, GraffitiIntro, etc.
lib/
  supabaseClient.ts         → Cliente de Supabase
  whatsapp.ts                → Lógica de mensaje pre-armado + links
db/schema.sql                → Schema completo de Supabase (con RLS)
docs/
  whatsapp-bot-spec.md      → Especificación del bot
  deployment-checklist.md   → Checklist de lanzamiento
```

## Estado actual
Scaffold funcional con datos de ejemplo (placeholders) en las páginas
públicas y el panel admin. Logo real de marca ya integrado
(`public/brand/three-caps-logo.jpg`) en nav, apertura animada, footer,
panel admin y favicon. Falta conectar:
1. Fetch real a Supabase en lugar de los arrays placeholder.
2. Autenticación de admin (Supabase Auth + verificación contra `admin_users`).
3. Webhook del bot de WhatsApp (`app/api/whatsapp-webhook/route.ts`).
4. Fotografía real de producto — reemplazar los íconos "FOTO REF." en
   `components/ProductCard.tsx` marcando `hasRealPhoto: true` por producto.
5. Tipografías finales de marca en `app/globals.css`.

## Cómo correr localmente
```bash
npm install
cp .env.example .env.local   # completar con las credenciales de Supabase
npm run dev
```

## Documentos clave
- [`db/schema.sql`](./db/schema.sql) — esquema completo con RLS.
- [`docs/whatsapp-bot-spec.md`](./docs/whatsapp-bot-spec.md) — spec del bot.
- [`docs/deployment-checklist.md`](./docs/deployment-checklist.md) — checklist de lanzamiento.
