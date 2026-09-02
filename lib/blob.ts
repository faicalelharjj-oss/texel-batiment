import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import path from "path";

const bucket = process.env.R2_BUCKET_NAME;
const publicUrl = (process.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");

function getClient() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
    throw new Error("Configuration R2 manquante (voir .env.example)");
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function uploadPhoto(file: File, folder: string) {
  const client = getClient();
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${crypto.randomUUID()}${ext}`;
  const key = `${folder}/${filename}`;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type || "image/jpeg",
    })
  );
  return `${publicUrl}/${key}`;
}

export async function deletePhoto(url: string | null | undefined) {
  if (!url || !url.startsWith(publicUrl)) return;
  try {
    const client = getClient();
    const key = url.slice(publicUrl.length + 1);
    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  } catch {
    // suppression best-effort — ne bloque pas l'operation principale
  }
}
