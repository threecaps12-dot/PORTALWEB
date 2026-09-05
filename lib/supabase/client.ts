import { createBrowserClient } from "@supabase/ssr";

// Cliente para Client Components (login, logout, acciones interactivas del panel admin).
// Comparte cookies de sesión con el servidor vía @supabase/ssr.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
