import e from '../../../lib/server/e';
import { client } from '../../../lib/server/e';

export const load = async () => {
  return {
    posts: await e.select(e.BlogPost, (post) => ({
      id: true,
      title: true,
      subtitle: true,
      content: true,
      createdAt: true,
      updatedAt: true
    })).run(client)
  };
};
