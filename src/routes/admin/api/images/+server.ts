import e from '../../../../lib/server/e';
import { client } from "../../../../lib/server/e";
import { mkdir, writeFile, unlink, readdir } from "node:fs/promises";
import path from "node:path";

const IMAGE_DIR = path.join(process.cwd(), "public", "images");

async function findImageFileName(id: string) {
  try {
    const files = await readdir(IMAGE_DIR);
    return files.find((file) => path.parse(file).name === id) ?? null;
  } catch {
    return null;
  }
}

function isWebpBuffer(buffer: Buffer) {
  return buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
}

async function saveImage(file: File, description: string) {
  const inputBuffer = Buffer.from(await file.arrayBuffer());

  if (!isWebpBuffer(inputBuffer)) {
    throw new Error('Only WebP images are accepted.');
  }

  const { id } = await e
    .insert(e.Image, {
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .run(client);

  const fileName = `${id}.webp`;
  const filePath = path.join(IMAGE_DIR, fileName);
  await writeFile(filePath, inputBuffer);

  return id;
}

export const POST = async ({ request }) => {
  const formData = await request.formData();
  const files = [...formData.getAll("files"), ...formData.getAll("file")].filter(
    (item): item is File => item instanceof File && item.size > 0
  );
  const description = (formData.get("description") as string) || "";

  if (files.length === 0) {
    return new Response("Missing file", { status: 400 });
  }

  try {
    await mkdir(IMAGE_DIR, { recursive: true });

    for (const file of files) {
      await saveImage(file, description);
    }

    return new Response(`${files.length} image uploaded and database updated`, { status: 200 });
  } catch (error) {
    console.error("Error saving file or inserting into database:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async ({ request }) => {
  const { id } = await request.json();
  if (!id) {
    return new Response("Missing image ID", { status: 400 });
  }
  try {
    await e
      .delete(e.Image, () => ({
        filter_single: { id },
      }))
      .run(client);

    const fileName = await findImageFileName(id);
    if (fileName) {
      await unlink(path.join(IMAGE_DIR, fileName));
    }
    return new Response("Image deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async ({ request }) => {
  const { id, description } = await request.json();
  if (!id || description === undefined) {
    return new Response("Missing image ID or description", { status: 400 });
  }
  try {
    await e
      .update(e.Image, () => ({
        filter_single: { id },
        set: { description, updatedAt: new Date() },
      }))
      .run(client);

    return new Response("Image description updated", { status: 200 });
  } catch (error) {
    console.error("Error updating image description:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
