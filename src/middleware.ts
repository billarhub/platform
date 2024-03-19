import createMiddleware from 'next-intl/middleware';
import { localesConfig } from './utils/localesConfig';
import { NextRequest, NextResponse } from 'next/server';
const publicPages = ['/login', '/sign-up', '/'];

const intlMiddleware = createMiddleware({
  locales: localesConfig,
  defaultLocale: 'es'
});



export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;

  const publicPathnameRegex = RegExp(
    `^(/(${localesConfig.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );

  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

  // Extract the locale from the URL, or use the default locale if not present
  const locale = request.nextUrl.pathname.split('/')[1] || 'es';

  // If the user is unauthenticated and tries to access a non-public page
  if (!isPublicPage && !authToken) {
    const response = NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    response.cookies.delete("authToken");
    return response;
  }

  // If the user is authenticated and tries to access a public page
  if (isPublicPage && authToken) {
    const response = NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    return response;
  }

  if (!isPublicPage && authToken) {
    return intlMiddleware(request);
  }

  if (isPublicPage && !authToken) {
    return intlMiddleware(request);
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(auth)'],
};