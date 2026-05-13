import e from '../../../../lib/server/e';
import { client } from "../../../../lib/server/e";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

const IMAGE_DIR = path.join(process.cwd(), 'static', 'images');

export const POST = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const description = (formData.get("description") as string) || "";

  if (!file) {
    return new Response("Missing file or description", { status: 400 });
  }

  const maxSize = 4 * 1024 * 1024;
  if (file.size > maxSize) {
    return new Response("A kép mérete nem haladhatja meg a 4 MB-ot.", { status: 400 });
  }

  try {
    await mkdir(IMAGE_DIR, { recursive: true });

    const { id } = await e
      .insert(e.Image, {
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .run(client);

    const filePath = path.join(IMAGE_DIR, id);
    await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    return new Response("File uploaded and database updated", { status: 200 });
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

    await unlink(path.join(IMAGE_DIR, id));
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
