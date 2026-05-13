import e from '$lib/server/e';
import { client } from '$lib/server/e';

export const load = async () => {
  const images = await e
    .select(e.Image, (image) => ({
      id: true,
      description: true,
      createdAt: true,
      updatedAt: true
    }))
    .run(client);

  return {
    images
  };
};
