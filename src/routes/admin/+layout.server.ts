import { redirect } from '@sveltejs/kit';

const SESSION_COOKIE = 'admin_session';
const ADMIN_SESSION_VALUE = 'admin_authenticated_v1';

export const load = async ({ cookies, url }) => {
  const session = cookies.get(SESSION_COOKIE);
  const isLoginRoute = url.pathname === '/admin/login';
  const isLogoutRoute = url.pathname === '/admin/logout';
  const hasValidSession = session === ADMIN_SESSION_VALUE;

  if (hasValidSession && isLoginRoute) {
    throw redirect(303, '/admin');
  }

  if (!hasValidSession) {
    if (!isLoginRoute && !isLogoutRoute) {
      throw redirect(303, '/admin/login');
    }
  }

  return {
    adminAuthed: hasValidSession
  };
};
