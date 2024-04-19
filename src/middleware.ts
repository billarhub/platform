import createMiddleware from 'next-intl/middleware';
import { localesConfig } from './utils/localesConfig';
import { NextRequest, NextResponse } from 'next/server';
import { IDecodedJwt } from './models';
import { jwtDecode } from 'jwt-decode';

const publicPages = ['/login', '/sign-up', '/'];

const guestBlockedPages = ['/tournaments/create'];

const intlMiddleware = createMiddleware({
  locales: localesConfig,
  defaultLocale: 'es'
});



export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;
  let jwtDecoded = authToken ? jwtDecode(authToken) as IDecodedJwt : null;

  let requestUrlPathname = request.nextUrl.pathname;

  const pathWithoutLocale = requestUrlPathname.split('/').slice(2).join('/');

  const publicPathnameRegex = RegExp(
    `^(/(${localesConfig.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );

  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

  // Extract the locale from the URL, or use the default locale if not present
  const locale = request.nextUrl.pathname.split('/')[1] || 'es';

  if (guestBlockedPages.includes(`/${pathWithoutLocale}`) && jwtDecoded?.userId === process.env.NEXT_PUBLIC_GUEST_ID) {
    const response = NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    return response;
  }

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