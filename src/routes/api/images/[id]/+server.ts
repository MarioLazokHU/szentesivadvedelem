import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const IMAGE_DIR = path.join(process.cwd(), 'public', 'images');

const CONTENT_TYPES: Record<string, string> = {
  '.avif': 'image/avif',
  '.bmp': 'image/bmp',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

async function findImageFileName(id: string) {
  try {
    const files = await readdir(IMAGE_DIR);
    return files.find((file) => path.parse(file).name === id) ?? files.find((file) => file === id) ?? null;
  } catch {
    return null;
  }
}

function getContentType(fileName: string) {
  return CONTENT_TYPES[path.extname(fileName).toLowerCase()] ?? 'image/jpeg';
}

export const GET = async ({ params }) => {
  const { id } = params;

  try {
    const fileName = await findImageFileName(id);

    if (!fileName) {
      return new Response('Kép nem található', { status: 404 });
    }

    const data = await readFile(path.join(IMAGE_DIR, fileName));
    return new Response(data, {
      headers: {
        "Content-Type": getContentType(fileName),
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch (error) {
    return new Response('Kép nem található', { status: 404 });
  }
};