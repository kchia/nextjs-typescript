// Middleware enables you to use code over configuration.
// This gives you full flexibility in Next.js, because you can run code before a request is completed.
// Based on the user's incoming request, you can modify the response by rewriting, redirecting, adding headers, or even streaming HTML.
// Middleware can be used for anything that shares logic for a set of pages, including authentication, bot protection, redirects and rewrites, handling unsupported browsers, feature flags and A/B tests, server side analytics, logging, advanced i18n routing requirements. Lots of examples at https://nextjs.org/docs/middleware

// - package.json
// - /pages
//     index.tsx
//     - /about
//       _middleware.ts # Will run first
//       about.tsx
//       - /teams
//         _middleware.ts # Will run second
//         teams.tsx

import type { NextFetchEvent, NextRequest } from "next/server";

export type Middleware = (
  request: NextRequest,
  event: NextFetchEvent
) => Promise<Response | undefined> | Response | undefined;

const PUBLIC_FILE = /\.(.*)$/;

const stripDefaultLocale = (str: string): string => {
  const stripped = str.replace("/default", "");
  return stripped;
};

// Middleware is created by using a middleware function that lives inside a _middleware file.
// It will run on all routes within the /pages directory
// We can use Middleware to add custom routing rules:
// This Middleware skips adding the default prefix to API Routes and public files like fonts or images. If a request is made to the default locale, we redirect to our prefix /en.
export function middleware(request: NextRequest, event: NextFetchEvent) {
  // use the standard Web API Response
  // return new Response("Hello, world!");
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.includes("/api/") &&
    request.nextUrl.locale === "default";

  return shouldHandleLocale
    ? NextResponse.redirect(
        `/en${stripDefaultLocale(request.nextUrl.pathname)}${
          request.nextUrl.search
        }`
      )
    : undefined;
}
