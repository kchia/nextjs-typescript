import "../styles/globals.css"; // these styles will apply to all pages and components in the app. In production all CSS files will be automatically concatenated into a single minified `.css` file
// import "bootstrap/dist/css/bootstrap.css"; // if you're using bootstrap

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import Layout from "../components/layout";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// single layout
// export default function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }

// multiple layouts
// When navigating between pages, we want to persist page state (input values, scroll position, etc.) for a Single-Page Application (SPA) experience.
// This layout pattern enables state persistence because
// the React component tree is maintained between page transitions.
// With the component tree, React can understand which elements have changed to preserve state.
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
