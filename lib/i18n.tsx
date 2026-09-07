"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, string>;

function flatten(obj: Record<string, any>, prefix = ""): Dict {
  const out: Dict = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      out[path] = value;
    } else {
      Object.assign(out, flatten(value, path));
    }
  }
  return out;
}

const RAW = {
  es: {
    announcement: {
      bar: "ENVÍO A TODO USA · 2+ UNIDADES A $45 C/U CON ENVÍO INCLUIDO · EDICIONES LIMITADAS",
    },
    nav: {
      gorras: "GORRAS",
      ropa: "ROPA",
      colecciones: "COLECCIONES",
      destacados: "DESTACADOS",
      cart: "Carrito",
      search: "Buscar",
      searchPlaceholder: "Buscar gorras...",
    },
    theme: {
      toLight: "Cambiar a modo claro",
      toDark: "Cambiar a modo oscuro",
    },
    lang: {
      toEnglish: "Switch to English",
      toSpanish: "Cambiar a español",
    },
    footer: {
      store: "TIENDA",
      gorras: "Gorras",
      ropa: "Ropa",
      colecciones: "Colecciones",
      help: "AYUDA",
      shipping: "Envíos",
      returns: "Cambios y devoluciones",
      contact: "Contacto",
      follow: "SÍGUENOS",
      forgedBy: "SITIO FORJADO POR LEGION STUDIO",
    },
    hero: {
      badge: "EDICIÓN LIMITADA · QUEDAN POCAS UNIDADES",
      title: "La colección que se agota primero.",
      cta: "COMPRAR AHORA",
    },
    home: {
      weeklyPicks: "RECOMENDADOS DE LA SEMANA",
      gothicTitle: "COLECCIÓN GÓTICA",
      gothicSub: "BORDADO EN RELIEVE",
      diamondTitle: "EDICIÓN DIAMANTE",
      diamondSub: "BRILLO QUE NO PASA DESAPERCIBIDO",
    },
    promo: {
      viewCollection: "VER COLECCIÓN",
    },
    grid: {
      products: "PRODUCTOS",
    },
    product: {
      addToCart: "AÑADIR AL CARRITO",
      added: "AÑADIDO AL CARRITO",
      lowStockCard: "Quedan {n}, se agota rápido",
      lowStockDetail: "Quedan {n} unidades disponibles",
      photoRef: "FOTO REF.",
      talla: "TALLA",
      soldOut: "AGOTADO",
      clickToZoom: "CLIC PARA AMPLIAR",
      close: "Cerrar",
    },
    catalog: {
      search: "BUSCAR",
      searchPlaceholder: "Nombre del producto...",
      collection: "COLECCIÓN",
      all: "Todas",
      featured: "Destacados",
      talla: "TALLA",
      maxPrice: "PRECIO MÁXIMO: ${n}",
      fullCatalog: "CATÁLOGO COMPLETO",
    },
    intro: {
      tap: "TOCA PARA CONTINUAR",
      skip: "Saltar introducción",
    },
    shipping: {
      title: "ENVÍOS A TODO USA",
      bubbleIntro: "¡Manda ese pedido, mi gente! Envío a todo USA. Si llevas",
      bubbleHighlight1: "2 o más piezas",
      bubbleMid: ", te sale a",
      bubbleHighlight2: "$45 c/u con envío incluido",
      bubbleEnd: ".",
      tier1Label: "PRECIO REGULAR",
      tier1Desc: "Recoges tú, sin envío",
      tier2Label: "1 UNIDAD",
      tier2Desc: "Envío a cualquier estado de USA",
      tier3Label: "2+ UNIDADES",
      tier3Desc: "Envío incluido, precio por unidad",
      bestPrice: "MEJOR PRECIO",
    },
    checkout: {
      order: "Pedido #{n}",
      confirm: "Confirma tu pedido y ciérralo directo con nosotros. Te respondemos al instante.",
      whatsapp: "FINALIZAR POR WHATSAPP",
      instagram: "FINALIZAR POR INSTAGRAM",
      copied: "Mensaje del pedido copiado. Pégalo (Ctrl+V) en el chat de Instagram y dale enviar.",
      paypal: "También aceptamos PayPal, indícalo al confirmar tu pedido.",
    },
    cart: {
      title: "TU CARRITO",
      sizeQty: "Talla {size} × {qty}",
    },
  },
  en: {
    announcement: {
      bar: "SHIPPING TO ALL 50 STATES · 2+ UNITS AT $45 EACH SHIPPING INCLUDED · LIMITED EDITIONS",
    },
    nav: {
      gorras: "CAPS",
      ropa: "APPAREL",
      colecciones: "COLLECTIONS",
      destacados: "FEATURED",
      cart: "Cart",
      search: "Search",
      searchPlaceholder: "Search caps...",
    },
    theme: {
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
    },
    lang: {
      toEnglish: "Switch to English",
      toSpanish: "Cambiar a español",
    },
    footer: {
      store: "SHOP",
      gorras: "Caps",
      ropa: "Apparel",
      colecciones: "Collections",
      help: "HELP",
      shipping: "Shipping",
      returns: "Exchanges & returns",
      contact: "Contact",
      follow: "FOLLOW US",
      forgedBy: "SITE FORGED BY LEGION STUDIO",
    },
    hero: {
      badge: "LIMITED EDITION · FEW UNITS LEFT",
      title: "The collection that sells out first.",
      cta: "SHOP NOW",
    },
    home: {
      weeklyPicks: "THIS WEEK'S PICKS",
      gothicTitle: "GOTHIC COLLECTION",
      gothicSub: "RAISED EMBROIDERY",
      diamondTitle: "DIAMOND EDITION",
      diamondSub: "SHINE THAT DOESN'T GO UNNOTICED",
    },
    promo: {
      viewCollection: "VIEW COLLECTION",
    },
    grid: {
      products: "PRODUCTS",
    },
    product: {
      addToCart: "ADD TO CART",
      added: "ADDED TO CART",
      lowStockCard: "Only {n} left, selling fast",
      lowStockDetail: "Only {n} units left in stock",
      photoRef: "REF. PHOTO",
      talla: "SIZE",
      soldOut: "SOLD OUT",
      clickToZoom: "CLICK TO ZOOM",
      close: "Close",
    },
    catalog: {
      search: "SEARCH",
      searchPlaceholder: "Product name...",
      collection: "COLLECTION",
      all: "All",
      featured: "Featured",
      talla: "SIZE",
      maxPrice: "MAX PRICE: ${n}",
      fullCatalog: "FULL CATALOG",
    },
    intro: {
      tap: "TAP TO CONTINUE",
      skip: "Skip intro",
    },
    shipping: {
      title: "SHIPPING TO ALL 50 STATES",
      bubbleIntro: "Send in that order! Shipping to every US state. Grab",
      bubbleHighlight1: "2 or more pieces",
      bubbleMid: " and it comes out to",
      bubbleHighlight2: "$45 each, shipping included",
      bubbleEnd: ".",
      tier1Label: "REGULAR PRICE",
      tier1Desc: "You pick it up, no shipping",
      tier2Label: "1 UNIT",
      tier2Desc: "Shipping to any US state",
      tier3Label: "2+ UNITS",
      tier3Desc: "Shipping included, price per unit",
      bestPrice: "BEST PRICE",
    },
    checkout: {
      order: "Order #{n}",
      confirm: "Confirm your order and close it out directly with us. We reply instantly.",
      whatsapp: "CHECKOUT ON WHATSAPP",
      instagram: "CHECKOUT ON INSTAGRAM",
      copied: "Order message copied. Paste it (Ctrl+V) in the Instagram chat and hit send.",
      paypal: "We also accept PayPal, just mention it when confirming your order.",
    },
    cart: {
      title: "YOUR CART",
      sizeQty: "Size {size} × {qty}",
    },
  },
} as const;

const DICTS: Record<Lang, Dict> = {
  es: flatten(RAW.es),
  en: flatten(RAW.en),
};

function translate(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  let str = DICTS[lang][key] ?? DICTS.es[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(`{${k}}`, String(v));
    }
  }
  return str;
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLanguage: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "three-caps-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "es") setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  function toggleLanguage() {
    setLang(lang === "es" ? "en" : "es");
  }

  const t = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return ctx;
}
