# CONTEXTO DEL PROYECTO — Three Caps E-commerce (LEGION Studio)

Pega este documento completo a Claude Code al iniciar la sesión. Resume
todo lo decidido y hecho hasta ahora para que continúes sin repetir
trabajo ni contradecir decisiones ya tomadas con el cliente.

## 1. Quién es el cliente y qué se está construyendo

- Agencia: **LEGION Studio** (identidad Roman/Spartan, solo como firma
  discreta en el footer del sitio del cliente — NO como estilo dominante).
- Cliente: **Three Caps** (Instagram: `threecaps_usa`), marca de streetwear
  urbano (gorras y ropa) en Estados Unidos. Son **tres amigos** — de ahí
  el nombre. Es la primera incursión de LEGION Studio en el mercado
  americano, así que el nivel debe ser premium.
- Logo definitivo ya está aprobado y en uso: badge circular negro/dorado/
  rojo carmesí con "THREE CAPS" en arco y una gorra al centro (generado
  con Gemini Pro / Nano Banana). Archivo en `public/brand/three-caps-logo.jpg`.

## 2. Repositorio y estado del código

- **GitHub**: https://github.com/threecaps12-dot/PORTALWEB (ya subido
  manualmente vía la interfaz web de GitHub, cuenta `threecaps12-dot`).
- El código sigue la estructura estándar de Next.js 14 (App Router).
  Ver `README.md` dentro del repo para el mapa completo de carpetas.
- **Correcciones ya aplicadas** en esta entrega (antes de que fallara el
  primer deploy en Vercel):
  - Se agregó `next.config.js` (no existía).
  - Se agregó `.gitignore`.
  - Se corrigió un error de tipos de TypeScript en
    `app/admin/pedidos/page.tsx` (`status: "paid"` no coincidía con el
    tipo literal `Order["status"]`).
- **Si vuelve a fallar el build en Vercel**: pedir al cliente el log
  completo (el que compartió estaba cortado justo después de
  "Running npm run build", sin mostrar el error real). Revisar
  especialmente errores de tipos de TypeScript en modo estricto
  (`tsconfig.json` tiene `"strict": true`) y rutas dinámicas como
  `app/producto/[slug]/page.tsx`.

## 3. Stack técnico (decisión ya tomada y justificada con el cliente)

**Next.js + Supabase + Vercel** — mismo patrón que otros proyectos de
LEGION (Marea Mulata, LookBarber). Justificación ya dada: capa gratuita
de ambos cubre el volumen inicial esperado, Supabase Auth + RLS resuelve
el login del panel admin sin construir nada desde cero, Next.js da
SSR/ISR para SEO desde el día uno.

## 4. Supabase — YA CONECTADO Y CONFIGURADO

- Proyecto: **`threecaps`**, ref `smqdyqqtiufzmdltgsrx`, región `sa-east-1`.
- URL: `https://smqdyqqtiufzmdltgsrx.supabase.co`
- Anon/publishable key: `sb_publishable_R6iskKMfOYdwcEHVRi9jQA_jQIovtLD`
- **Schema ya aplicado** (ver `db/schema.sql` en el repo): `collections`,
  `products`, `product_images`, `product_variants`, `carts`, `cart_items`,
  `orders`, `order_items`, `admin_users`. Todas con RLS activo y sin
  advertencias de seguridad pendientes.
- **3 usuarios ya creados** en `auth.users` + `admin_users`, dominio
  `threecapsusa.com` (confirmado por el cliente, aunque el dominio real
  aún no se ha comprado — no importa para el login, es solo el string
  del correo):
  - `admin1@threecapsusa.com` — rol `admin`
  - `admin2@threecapsusa.com` — rol `admin`
  - `empleado1@threecapsusa.com` — rol `employee`
  - (Las contraseñas ya se le compartieron al cliente directamente en el
    chat — pídeselas a él si las necesitas para pruebas, no las repitas
    en logs ni las subas a ningún lado).
- **Pendiente**: el rol `employee` hoy tiene los mismos permisos que
  `admin` en las políticas RLS (cualquier fila en `admin_users` pasa el
  chequeo `exists`). El cliente mencionó que más adelante podría querer
  restringir el rol `employee` a solo pedidos/inventario, sin borrar
  productos ni ver reportes de ventas — no implementado aún, preguntar
  si se retoma.

## 5. Flujo de checkout — decisión de negocio ya tomada

**No hay pasarela de pago integrada (ni Stripe ni PayPal SDK).** El
flujo real es:
1. Cliente arma el carrito en el sitio.
2. Botón "Finalizar por WhatsApp" o "Finalizar por Instagram" genera un
   mensaje pre-armado con el pedido (ver `lib/whatsapp.ts`) y abre
   `wa.me` o el DM de Instagram.
3. PayPal se muestra solo como opción visible/nominal (botón o texto),
   sin integración real de checkout.
4. El pedido se cierra y se confirma el pago **manualmente** desde el
   panel admin (`orders.status`, `payment_method`, `payment_reference`
   en el schema ya contemplan esto).

**No agregues Stripe ni ninguna pasarela de pago real** salvo que el
cliente lo pida explícitamente — ya se decidió que no es lo que quieren
por ahora.

## 6. Bot de WhatsApp — especificación ya definida

Ver `docs/whatsapp-bot-spec.md` en el repo. Resumen: WhatsApp Cloud API
(Meta, gratis), webhook serverless en Vercel, consulta a Supabase para
precio/stock/talla. Modelo comercial: primera semana gratis, luego cobro
mensual fijo por hosting+mantenimiento+soporte. **No implementado
todavía** — solo está la especificación y la función `buildOrderMessage`
en `lib/whatsapp.ts` que arma el mensaje del lado del cliente.

## 7. Hosting y dominio — decisión de negocio ya tomada (IMPORTANTE)

- **Ahora mismo (fase de pruebas)**: todo gratis — GitHub + Vercel Hobby
  + Supabase capa gratuita. El cliente sabe que Vercel Hobby es solo
  para uso NO comercial y que toca migrar cuando el sitio empiece a
  vender de verdad.
- **Plan a futuro cuando lancen de verdad** (ya evaluado y decidido,
  no reabrir esta discusión salvo que el cliente lo pida):
  Cliente prefiere **pago prepagado/anual, no suscripción mensual**.
  Se descartó Vercel Pro ($20 USD/mes) por ser recurrente mensual.
  Se descartó un plan "Unlimited" de Hostinger por traer features no
  usadas (e-commerce propio, IA) y requerir pago grande de una vez.
  **Decisión: plan "Single" de Hostinger** (~$1.79–8/mes según plazo,
  soporta Node.js, dominio gratis 1er año, 10GB SSD) — el cliente estaba
  decidiendo entre pagar 12 meses (~$36–48 USD/año) o 48 meses de una
  vez ($85.92 USD) cuando se pausó esta conversación para resolver el
  deploy. Confirmar con el cliente cuál eligió antes de dar por cerrado
  este punto.
- Dominio decidido: **`threecapsusa.com`** (aún no comprado al momento
  de escribir esto).

## 8. Vercel — estado actual

- Proyecto importado desde GitHub (`PORTALWEB`), conectado a la cuenta
  `threecaps12-dot`.
- Variables de entorno ya configuradas en el import:
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `NEXT_PUBLIC_WHATSAPP_NUMBER` (puede tener un valor temporal —
  confirmar con el cliente el número real), `NEXT_PUBLIC_INSTAGRAM_HANDLE`
  (`threecaps_usa`).
- **Primer deploy falló.** El log que compartió el cliente se cortó
  justo después de "Running npm run build" sin mostrar el error
  específico. Ya se aplicaron 2 correcciones probables (arriba, sección 2)
  antes de este documento. Próximo paso: pedir el log completo o
  re-intentar el deploy con los archivos corregidos y revisar el
  resultado.

## 9. Lo que falta por hacer (pendientes reales, en orden sugerido)

1. **Resolver el deploy de Vercel** — aplicar las correcciones ya
   hechas (sección 2), subirlas al repo, y volver a deployar. Si vuelve
   a fallar, pedir el log completo del error.
2. **Conectar el login real del panel admin** con Supabase Auth — hoy
   `/admin` es solo visual, cualquiera con la URL entra sin autenticarse.
   Usar los 3 usuarios ya creados (sección 4).
3. **Cargar catálogo real** en Supabase (`products`, `product_variants`)
   — hoy el sitio usa arrays placeholder hardcodeados en las páginas.
4. **Reemplazar los íconos "FOTO REF."** en `ProductCard` por fotos
   reales de producto cuando el cliente las tenga (marcar
   `hasRealPhoto: true` por producto).
5. **Confirmar el número real de WhatsApp** y actualizarlo en las
   variables de entorno de Vercel.
6. Comprar el dominio y conectar hosting definitivo según lo decidido
   en la sección 7.
7. Implementar el webhook del bot de WhatsApp (sección 6) cuando el
   resto esté estable.

## 10. Reglas de marca a respetar en cualquier código/copy nuevo

- **Nunca usar emojis** en el sitio ni en el código (regla dura del
  cliente) — usar siempre iconos SVG.
- Paleta: Obsidian `#0D0D0D`, Crimson `#8C0B1E`, Gold `#D4AF37`, Cream
  `#FAF8F5`.
- Estructura/UX inspirada en New Era Colombia (barra de anuncio, nav,
  hero, grilla "Recomendados de la semana", filtros tipo sidebar).
- Copy con neuromarketing: escasez, anclaje de precio, un solo CTA
  dominante por sección.
