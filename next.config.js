/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';  
`;

const securityHeaders = [
  // This header controls DNS prefetching, allowing browsers to
  // proactively perform domain name resolution on external links, images, CSS, JavaScript, and more.
  // This prefetching is performed in the background, so the DNS is
  // more likely to be resolved by the time the referenced items are needed.
  // This reduces latency when the user clicks a link.
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // This header informs browsers it should only be accessed using HTTPS,
  // instead of using HTTP. Using the configuration below, all present and
  // future subdomains will use HTTPS for a max-age of 2 years.
  // This blocks access to pages or subdomains that can only be served over HTTP.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // This header stops pages from loading when they detect reflected cross-site scripting (XSS) attacks.
  // Although this protection is not necessary when sites implement a strong Content-Security-Policy disabling the use of inline JavaScript ('unsafe-inline'),
  // it can still provide protection for older web browsers that don't support CSP.
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // This header indicates whether the site should be allowed to be displayed within an iframe.
  // This can prevent against clickjacking attacks.
  // This header has been superseded by CSP's frame-ancestors option,
  // which has better support in modern browsers.
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // This header allows you to control which features and APIs can be
  // used in the browser. It was previously named Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // This header prevents the browser from attempting to guess the type of content if the Content-Type header is not explicitly set.
  // This can prevent XSS exploits for websites that allow users to upload and share files. For example, a user trying to download an image, but having it treated as a different Content-Type like an executable, which could be malicious.
  // This header also applies to downloading browser extensions. The only valid value for this header is nosniff.
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // This header controls how much information the browser includes when navigating from the current website (origin) to another.
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // This header helps prevent cross-site scripting (XSS), clickjacking and other code injection attacks.
  // Content Security Policy (CSP) can specify allowed origins for content including scripts, stylesheets, images, fonts, objects, media (audio, video), iframes, and more.
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

const nextConfig = withMDX({
  // security headers
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // internationalized routing
  i18n: {
    // These are all the locales you want to support in
    // your application
    // If you have a pages/blog.js the following urls would be available:
    // /blog
    // /fr/blog
    // /nl-nl/blog
    locales: ["en-US", "fr", "nl-NL"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en-US",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    domains: [
      {
        // Note: subdomains must be included in the domain value to be matched
        // e.g. www.example.com should be used if that is the expected hostname
        domain: "example.com",
        defaultLocale: "en-US",
      },
      {
        domain: "example.nl",
        defaultLocale: "nl-NL",
      },
      {
        domain: "example.fr",
        defaultLocale: "fr",
        // an optional http field can also be used to test
        // locale domains locally with http instead of https
        http: true,
      },
    ],
  },
  // Source Maps are enabled by default during development. During production builds, they are disabled as generating source maps can significantly increase build times and memory usage while being generated.
  // When the productionBrowserSourceMaps option is enabled, the source maps will be output in the same directory as the JavaScript files.
  productionBrowserSourceMaps: true,
  // AMP pages are automatically validated with amphtml-validator during development
  // but you can also set up your own validators
  amp: {
    validator: "./custom_validator.js",
    skipValidation: true, // or skip validation altogether
  },
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  swcMinify: true, // You can opt-in to using the Next.js compiler for minification. This is 7x faster than Terser.
  reactStrictMode: true,
  images: {
    domains: ["example.com", "example2.com"], // allow app to access remote images at these domains
  },
  eslint: {
    dirs: ["pages", "utils"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // The Next.js Compiler, written in Rust using [SWC](https://swc.rs/), allows Next.js to transform and minify your JavaScript code for production. This replaces Babel for individual files and Terser for minifying output bundles.
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
    reactRemoveProperties: true, // Allows to remove JSX properties. This is often used for testing.
    removeConsole: true, // This transform allows for removing all console.* calls in application code (not node_modules).
    // removeConsole: {
    //   exclude: ["error"], // Remove console.* output except console.error:
    // },
  },
  experimental: {
    emotion:
      boolean |
      {
        // default is true. It will be disabled when build type is production.
        sourceMap: boolean,
        // default is 'dev-only'.
        autoLabel: "never" | "dev-only" | "always",
        // default is '[local]'.
        // Allowed values: `[local]` `[filename]` and `[dirname]`
        // This option only works when autoLabel is set to 'dev-only' or 'always'.
        // It allows you to define the format of the resulting label.
        // The format is defined via string where variable parts are enclosed in square brackets [].
        // For example labelFormat: "my-classname--[local]", where [local] will be replaced with the name of the variable the result is assigned to.
        labelFormat: string,
      },
  },
});

module.exports = nextConfig;
