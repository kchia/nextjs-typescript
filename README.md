This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## ESLint

The setup includes Next.js' base ESLint configuration along with a stricter Core Web Vitals rule-set. This is the recommended configuration for developers setting up ESLint for the first time. Checkout `.eslintrc.json`. The default configuration (eslint-config-next) includes everything you need to have an optimal out-of-the-box linting experience in Next.js. 

See the [full set of rules](https://nextjs.org/docs/basic-features/eslint)

## TypeScript

`yarn create next-app --typescript` creates a zero-configuration setup for a TypeScript project with Next.js.

## Environment Variables

`.env`, `.env.development`, `.env.production`, and `.env.test` files should be included in your repository as they define defaults. `.env*.local` should be added to .gitignore, as those files are intended to be ignored. `.env.local` is where secrets can be stored.

## JavaScript Language Features 

Next.js allows you to use the latest JavaScript features out of the box. In addition to ES6 features, Next.js also supports:

- Async/await (ES2017)
- Object Rest/Spread Properties (ES2018)
- Dynamic import() (ES2020)
- Optional Chaining (ES2020)
- Nullish Coalescing (ES2020)
- Class Fields and Static Properties (part of stage 3 proposal)
- and more!

## Static HTML Export 

`next export` allows you to export your Next.js application to static HTML, which can be run standalone without the need of a Node.js server. 

## PostCSS Config

Next.js compiles CSS for its built-in CSS support using PostCSS.

Out of the box, with no configuration, Next.js compiles CSS with the following transformations:
- Autoprefixer automatically adds vendor prefixes to CSS rules (back to IE11).
- Cross-browser Flexbox bugs are corrected to behave like the spec.
- New CSS features are automatically compiled for Internet Explorer 11 compatibility:

By default, CSS Grid and Custom Properties (CSS variables) are not compiled for IE11 support.

## Zones

A zone is a single deployment of a Next.js app. You can have multiple zones and merge them as a single app. For example, let's say you have the following apps:

- An app for serving /blog/**
- Another app for serving all other pages

With [multi zones support](https://nextjs.org/docs/advanced-features/multi-zones), you can merge both these apps into a single one allowing your customers to browse it using a single URL, but you can develop and deploy both apps independently.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
