// Prepara fotos de celular/PC antes de subirlas al panel admin: las reduce y las
// convierte a JPG para que carguen rapido, quepan en el limite de Storage y se
// vean en cualquier navegador (las fotos originales del iPhone suelen ser HEIC
// de varios MB, que Chrome no puede mostrar).

const MAX_SIDE = 1800;
const JPEG_QUALITY = 0.86;

export class ImageUploadError extends Error {}

async function decode(file: File): Promise<{ source: CanvasImageSource; width: number; height: number; close: () => void }> {
  if (typeof createImageBitmap === "function") {
    try {
      const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
      return { source: bmp, width: bmp.width, height: bmp.height, close: () => bmp.close() };
    } catch {
      // seguimos con <img>
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return { source: img, width: img.naturalWidth, height: img.naturalHeight, close: () => URL.revokeObjectURL(url) };
  } catch {
    URL.revokeObjectURL(url);
    throw new ImageUploadError(
      "Este formato de foto no es compatible (probablemente HEIC). Súbela como JPG/PNG, o en el iPhone activa Ajustes > Cámara > Formatos > Más compatible."
    );
  }
}

/** Devuelve un JPG reducido a maximo 1800 px por lado. */
export async function prepareImageForUpload(file: File): Promise<File> {
  if (!file.type.startsWith("image/") && !/\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name)) {
    throw new ImageUploadError("El archivo no es una imagen.");
  }

  const { source, width, height, close } = await decode(file);
  try {
    if (!width || !height) throw new ImageUploadError("No se pudo leer la foto.");
    const scale = Math.min(1, MAX_SIDE / Math.max(width, height));
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new ImageUploadError("Tu navegador no pudo procesar la foto.");
    ctx.fillStyle = "#ffffff"; // fondo blanco para PNG con transparencia
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(source, 0, 0, w, h);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY));
    if (!blob) throw new ImageUploadError("No se pudo convertir la foto a JPG.");

    const base = file.name.replace(/\.[^.]+$/, "") || "foto";
    return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
  } finally {
    close();
  }
}
