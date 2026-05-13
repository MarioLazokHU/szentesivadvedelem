import e from '../../../../lib/server/e';
import { client } from '../../../../lib/server/e';

export const GET = async () => {
  const videos = await e.select(e.Video, (video) => ({
    id: true,
    url: true,
    description: true,
    createdAt: true,
    updatedAt: true
  })).run(client);

  return new Response(JSON.stringify(videos), {
    headers: { 'Content-Type': 'application/json' }
  });
};

function isYouTubeUrl(url: string) {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.toLowerCase();
    return host === 'www.youtube.com' || host === 'youtube.com' || host === 'youtu.be';
  } catch {
    return false;
  }
}

export const POST = async ({ request }) => {
  const { url, description } = await request.json();

  if (!url) {
    return new Response('Missing video URL', { status: 400 });
  }

  if (!isYouTubeUrl(url)) {
    return new Response('Only YouTube links are accepted', { status: 400 });
  }

  try {
    const video = await e
      .insert(e.Video, {
        url,
        description: description || '',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .run(client);

    return new Response(JSON.stringify(video), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error inserting video link:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async ({ request }) => {
  const { id, url, description } = await request.json();

  if (!id || !url) {
    return new Response('Missing id or url', { status: 400 });
  }

  if (!isYouTubeUrl(url)) {
    return new Response('Only YouTube links are accepted', { status: 400 });
  }

  try {
    await e
      .update(e.Video, () => ({
        filter_single: { id },
        set: {
          url,
          description: description || '',
          updatedAt: new Date()
        }
      }))
      .run(client);

    const updatedVideo = await e.select(e.Video, (video) => ({
      filter_single: { id },
      id: true,
      url: true,
      description: true,
      createdAt: true,
      updatedAt: true
    })).run(client);

    return new Response(JSON.stringify(updatedVideo), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating video link:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async ({ request }) => {
  const { id } = await request.json();

  if (!id) {
    return new Response('Missing video link ID', { status: 400 });
  }

  try {
    await e
      .delete(e.Video, () => ({
        filter_single: { id }
      }))
      .run(client);

    return new Response('Video link deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting video link:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
