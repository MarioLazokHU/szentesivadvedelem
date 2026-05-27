import e from "../../../lib/server/e";
import { client } from "../../../lib/server/e";

export const load = async () => {
  const images = await e
    .select(e.Image, (image) => ({
      ...image["*"],
    }))
    .run(client);

  return {
    images: await Promise.all(
      images.map(async (image) => ({
        ...image,
        fileName: image.id,
      })),
    ),
  };
};
