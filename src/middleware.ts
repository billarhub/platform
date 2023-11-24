import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from 'negotiator'
import { i18n } from "@/lib/utils/i18n-config";

export function getLocale(request: NextRequest): string | undefined {
  // Extraer el idioma de la ruta de la solicitud
  const pathLocale = request.nextUrl.pathname.split('/')[1] as 'en' | 'es';;


  if (i18n.locales.includes(pathLocale)) {
    return pathLocale;
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocale(request);
  const token = request.cookies.get('token');
  const response = NextResponse.next();
//   response.cookies.set('currentLocale', locale)

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
    return NextResponse.redirect(url);
  }

  if (token) {
    if (pathname === `/${locale}/login`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}`;
      return NextResponse.redirect(url);
    }
  } else {
    const protectedRoutes = ['/', `/${locale}`];
    if (protectedRoutes.includes(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/login`;
      return NextResponse.redirect(url);
    }
  }
  return response
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/en",
    "/es",
  ],
};
