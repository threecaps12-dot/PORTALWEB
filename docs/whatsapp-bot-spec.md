# Bot de WhatsApp — Especificación funcional

## Objetivo
Responder automáticamente precios, disponibilidad y tallas, y guiar al
cliente hacia el catálogo o hacia la confirmación de un pedido ya armado
desde el carrito del sitio (ver `lib/whatsapp.ts` y `CheckoutHandoff.tsx`).

## Arquitectura
- **Canal:** WhatsApp Cloud API (Meta) — gratis hasta un volumen alto de
  conversaciones iniciadas por el negocio; conversaciones iniciadas por el
  cliente (como las que llegan desde el botón "Finalizar por WhatsApp") no
  tienen costo en el modelo de Meta.
- **Webhook:** función serverless en Vercel (`app/api/whatsapp-webhook/route.ts`,
  pendiente de crear) que recibe los mensajes entrantes.
- **Datos:** el webhook consulta Supabase (`products`, `product_variants`)
  para responder precio/stock/talla en tiempo real.
- **Sin costo de infraestructura adicional** — corre dentro del mismo
  proyecto Vercel + Supabase.

## Flujos que debe cubrir

### 1. Consulta directa (cliente nuevo, sin pasar por el sitio)
Cliente escribe algo como "tienen la gorra roja en talla M" →
el bot busca coincidencias en `products`/`product_variants` por nombre/talla,
responde precio + disponibilidad, y adjunta el link al catálogo o a la
ficha de producto específica.

### 2. Pedido pre-armado desde el carrito (flujo principal)
Cliente llega con un mensaje ya formateado (generado por `buildOrderMessage`
en `lib/whatsapp.ts`), con el número de pedido, productos, tallas y total.
El bot:
1. Confirma recepción y reconoce el número de pedido.
2. Verifica stock real contra `product_variants.stock` (por si cambió
   entre que el cliente armó el carrito y escribió).
3. Si hay stock: confirma disponibilidad y pregunta método de pago
   (PayPal / transferencia / contraentrega, según lo que el negocio decida
   ofrecer) y datos de envío.
4. Si falta stock de algún ítem: informa y ofrece alternativa o ajuste
   del pedido.
5. Al cerrar, actualiza el pedido en `orders` (estado `paid` o
   `awaiting_payment` según corresponda) — esto puede quedar como paso
   manual del admin al inicio (botón "Marcar como pagado" en el panel)
   mientras se decide si automatizar la actualización desde el bot.

### 3. Preguntas frecuentes
Envíos, tiempos de entrega, cambios/devoluciones — respuestas fijas
configurables, sin necesidad de IA generativa para esta fase.

## Modelo comercial
Primera semana de uso gratis a modo de prueba. Después, se cobra una
tarifa mensual fija que cubre hosting, mantenimiento y soporte del bot.

## Fuera de alcance (fase inicial)
- Pago dentro del propio WhatsApp (WhatsApp Pay) — no está disponible aún
  para EE.UU. en la mayoría de los casos; el pago se resuelve fuera del
  chat (PayPal / link externo).
- Automatización 100% sin intervención humana — el negocio revisa y
  confirma manualmente los pedidos en la fase inicial, el bot filtra y
  prepara el trabajo pero no reemplaza la confirmación humana todavía.
