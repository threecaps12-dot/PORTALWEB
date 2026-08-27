import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente para uso en el navegador (catálogo, carrito, checkout).
// Las operaciones de admin (escribir productos/pedidos) pasan por RLS
// y requieren sesión autenticada con fila en admin_users.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
