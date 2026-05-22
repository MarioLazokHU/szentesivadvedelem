import e from '$lib/server/e';
import { client } from '$lib/server/e';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const IMAGE_DIR = path.join(process.cwd(), 'public/images', 'images');

async function getImageFileName(id: string) {
  try {
    const files = await readdir(IMAGE_DIR);
    return files.find((file) => path.parse(file).name === id) ?? null;
  } catch {
    return null;
  }
}

export const load = async () => {
  const images = await e
    .select(e.Image, (image) => ({
      id: true,
      description: true,
      createdAt: true,
      updatedAt: true
    }))
    .run(client);

  const imagesWithFiles = await Promise.all(
    images.map(async (image) => ({
      ...image,
      fileName: await getImageFileName(image.id)
    }))
  );

  return {
    images: imagesWithFiles
  };
};
