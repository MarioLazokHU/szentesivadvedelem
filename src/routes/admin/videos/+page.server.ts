import e from '../../../lib/server/e';
import { client } from '../../../lib/server/e';

export const load = async () => {
  return {
    videos: await e.select(e.Video, (video) => ({
      id: true,
      url: true,
      description: true,
      createdAt: true,
      updatedAt: true
    })).run(client)
  };
};
