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

function getIframeSrc(value: string) {
  return value.match(/<iframe[^>]+src=["']([^"']+)["']/i)?.[1] ?? null;
}

function isValidVideoValue(value: string) {
  const url = getIframeSrc(value) ?? value;

  try {
    new URL(url.trim());
    return true;
  } catch {
    return false;
  }
}

export const POST = async ({ request }) => {
  const { url, description } = await request.json();

  if (!url) {
    return new Response('Missing video URL or embed code', { status: 400 });
  }

  if (!isValidVideoValue(url)) {
    return new Response('Invalid video URL or embed code', { status: 400 });
  }

  try {
    const createdVideo = await e
      .insert(e.Video, {
        url,
        description: description || '',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .run(client);

    return new Response(JSON.stringify(createdVideo), {
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
    return new Response('Missing id or video value', { status: 400 });
  }

  if (!isValidVideoValue(url)) {
    return new Response('Invalid video URL or embed code', { status: 400 });
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
