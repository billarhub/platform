import createMiddleware from 'next-intl/middleware';
import { localesConfig } from './utils/localesConfig';

export default createMiddleware({
  // A list of all locales that are supported
  locales: localesConfig,

  // Used when no locale matches
  defaultLocale: 'es'
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/'],
};