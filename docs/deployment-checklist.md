# Checklist de deployment

## 1. Dominio
- [ ] Registrar dominio `.com` (opción más económica dentro del presupuesto
      de hosting/dominio acordado) — proveedores a comparar: Namecheap,
      Porkbun, GoDaddy.
- [ ] Apuntar DNS al proyecto de Vercel.

## 2. Supabase
- [ ] Crear proyecto en Supabase (capa gratuita).
- [ ] Ejecutar `db/schema.sql` en el SQL Editor.
- [ ] Configurar Storage bucket para imágenes de producto (`product-images`).
- [ ] Crear el primer usuario admin y agregar su fila en `admin_users`.
- [ ] Copiar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 3. Vercel
- [ ] Conectar el repo del proyecto.
- [ ] Configurar variables de entorno (ver `.env.example`).
- [ ] Deploy a producción (capa gratuita cubre el tráfico inicial esperado).
- [ ] Conectar el dominio comprado en el paso 1.

## 4. WhatsApp Cloud API
- [ ] Crear app de Meta for Developers y activar WhatsApp Cloud API
      (gratis para el volumen inicial).
- [ ] Configurar el número de WhatsApp del negocio.
- [ ] Configurar el webhook apuntando a la función serverless del proyecto.
- [ ] Definir `NEXT_PUBLIC_WHATSAPP_NUMBER` en variables de entorno.

## 5. PayPal
- [ ] Crear cuenta de negocio de PayPal (o PayPal.me) para el link de pago
      mostrado en el checkout.

## 6. Contenido
- [ ] Subir fotografía real de producto (reemplazar placeholders en
      `/public/products/` y `/public/hero-collection.jpg`).
- [ ] Cargar catálogo inicial en Supabase (`products`, `product_images`,
      `product_variants`).
- [ ] Definir tipografías finales de marca en `app/globals.css`.

## 7. QA antes de lanzar
- [ ] Probar flujo completo mobile: catálogo → ficha → carrito →
      "Finalizar por WhatsApp" → mensaje pre-armado correcto.
- [ ] Probar panel admin: login, marcar pedido como pagado, ajustar stock.
- [ ] Verificar que la animación de apertura no se repita en cada
      navegación (solo primera visita de la sesión).
- [ ] Revisar que ningún texto del sitio use emojis (regla dura de marca).

## Notas de costo
Dentro del presupuesto acordado para hosting/dominio, el único gasto
recurrente real en esta fase es el dominio (anual). Vercel, Supabase y
WhatsApp Cloud API operan en capa gratuita mientras el volumen de tráfico
y conversaciones se mantenga bajo — que es el escenario esperado para un
lanzamiento nuevo en el mercado de EE.UU.
