import e from '../../../../lib/server/e';
import { client } from '../../../../lib/server/e';

export const GET = async () => {
  const posts = await e.select(e.BlogPost, (post) => ({
    id: true,
    title: true,
    subtitle: true,
    content: true,
    createdAt: true,
    updatedAt: true
  })).run(client);

  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST = async ({ request }) => {
  const { title, subtitle, content } = await request.json();

  if (!title || !content) {
    return new Response('Missing title or content', { status: 400 });
  }

  try {
    const post = await e
      .insert(e.BlogPost, {
        title,
        subtitle: subtitle || '',
        content,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .run(client);

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error inserting blog post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async ({ request }) => {
  const { id, title, subtitle, content } = await request.json();

  if (!id || !title || !content) {
    return new Response('Missing id, title, or content', { status: 400 });
  }

  try {
    await e
      .update(e.BlogPost, () => ({
        filter_single: { id },
        set: {
          title,
          subtitle: subtitle || '',
          content,
          updatedAt: new Date()
        }
      }))
      .run(client);

    return new Response('Blog post updated', { status: 200 });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async ({ request }) => {
  const { id } = await request.json();

  if (!id) {
    return new Response('Missing blog post ID', { status: 400 });
  }

  try {
    await e
      .delete(e.BlogPost, () => ({
        filter_single: { id }
      }))
      .run(client);

    return new Response('Blog post deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
