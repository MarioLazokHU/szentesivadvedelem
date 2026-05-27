import e from "../../../lib/server/e";
import { client } from "../../../lib/server/e";

export const load = async () => {
  const videos = await e.select(e.Video, (video) => ({
    id: true,
    url: true,
    description: true,
    createdAt: true,
    updatedAt: true
  })).run(client);

  return {
    videos: videos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  };
};
