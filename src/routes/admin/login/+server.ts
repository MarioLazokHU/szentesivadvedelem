import { json, redirect } from '@sveltejs/kit';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_COOKIE = 'admin_session';
const ADMIN_SESSION_VALUE = 'admin_authenticated_v1';

export const POST = async ({ request, cookies }) => {
  const { password } = await request.json();

  if (!password || password !== ADMIN_PASSWORD) {
    return json('Helytelen jelszó.', { status: 401 });
  }

  cookies.set(SESSION_COOKIE, ADMIN_SESSION_VALUE, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24
  });

  throw redirect(303, '/admin');
};
