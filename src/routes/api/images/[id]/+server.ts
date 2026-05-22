
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const IMAGE_DIR = path.join(process.cwd(), 'public', 'images');





export const GET = async ({ params }) => {
  const { id } = params;

  try {
    const data = await readFile(path.join(IMAGE_DIR, id));
    return new Response(data, {
      headers: {
        "Content-Type": "image/*"
      }
    });
  } catch (error) {
    return new Response('Kép nem található', { status: 404 });
  }
};