
import { readFile } from "node:fs/promises";
import path from "node:path";

const IMAGE_DIR = path.join(process.cwd(), 'static', 'images');

export const GET = async ({ params }) => {
  const filePath = path.join(IMAGE_DIR, params.id);

  try {
    const data = await readFile(filePath);
    return new Response(data, {
      headers: {
        "Content-Type": "image/jpeg"
      }
    });
  } catch (error) {
    return new Response('Kép nem található', { status: 404 });
  }
};