import { redirect } from '@sveltejs/kit';

const SESSION_COOKIE = 'admin_session';

export const GET = async ({ cookies }) => {
  cookies.set(SESSION_COOKIE, '', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0
  });

  throw redirect(303, '/');
};
