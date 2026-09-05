import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-obsidian text-cream/70 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          {/* Acceso discreto al panel admin: sin indicio visual, solo el logo de siempre */}
          <Link href="/admin" className="inline-flex items-center mb-4">
            <Image
              src="/brand/three-caps-wordmark.png"
              alt="Three Caps"
              width={1942}
              height={809}
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>
        <div>
          <h4 className="text-cream mb-3 tracking-wide">TIENDA</h4>
          <ul className="space-y-2">
            <li>Gorras</li>
            <li>Ropa</li>
            <li>Colecciones</li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream mb-3 tracking-wide">AYUDA</h4>
          <ul className="space-y-2">
            <li>Envíos</li>
            <li>Cambios y devoluciones</li>
            <li>Contacto</li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream mb-3 tracking-wide">SÍGUENOS</h4>
          <ul className="space-y-2">
            <li>Instagram</li>
            <li>WhatsApp</li>
          </ul>
        </div>
      </div>

      {/* Firma de autoría LEGION Studio — sello discreto, no estilo dominante */}
      <div className="border-t border-cream/10 py-4 text-center text-[11px] tracking-[0.15em] text-cream/40">
        SITIO FORJADO POR LEGION STUDIO
      </div>
    </footer>
  );
}
