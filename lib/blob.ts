import { put, del } from "@vercel/blob";

export async function uploadPhoto(file: File, folder: string) {
  const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : ".jpg";
  const filename = `${folder}/${crypto.randomUUID()}${ext}`;
  const blob = await put(filename, file, { access: "public", addRandomSuffix: false });
  return blob.url;
}

export async function deletePhoto(url: string | null | undefined) {
  if (!url) return;
  try {
    await del(url);
  } catch {
    // suppression best-effort — ne bloque pas l'operation principale
  }
}
