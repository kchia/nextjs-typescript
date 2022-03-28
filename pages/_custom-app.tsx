import type { AppProps, NextWebVitalsMetric } from "next/app";

// Next.js uses the App component to initialize pages. You can override it and control the page initialization. Which allows you to do amazing things like:

// for measuring performance
// This function is fired when the final values for any of the metrics have finished calculating on the page.
// You can use to log any of the results to the console or send to a particular endpoint.
// You can track web vitals metrics or custom metrics
export function reportWebVitals(metric: NextWebVitalsMetric) {
  //   Web Vitals are a set of useful metrics that aim to capture the user experience of a web page. The following web vitals are all included:
  // - Time to First Byte (TTFB)
  // - First Contentful Paint (FCP)
  // - Largest Contentful Paint (LCP)
  // - First Input Delay (FID)
  // - Cumulative Layout Shift (CLS)
  if (metric.label === "web-vital") {
    console.log(metric); // The metric object ({ id, name, startTime, value, label }) is logged to the console
  }

  switch (metric.name) {
    case "FCP":
      // handle FCP results
      break;
    case "LCP":
      // handle LCP results
      break;
    case "CLS":
      // handle CLS results
      break;
    case "FID":
      // handle FID results
      break;
    case "TTFB":
      // handle TTFB results
      break;
    default:
      break;
  }

  // there are also custom metrics
  // Next.js-hydration: Length of time it takes for the page to start and finish hydrating (in ms)
  // Next.js-route-change-to-render: Length of time it takes for a page to start rendering after a route change (in ms)
  // Next.js-render: Length of time it takes for a page to finish render after a route change (in ms)

  if (metric.label === "custom") {
    console.log(metric); // The metric object ({ id, name, startTime, value, label }) is logged to the console
  }

  switch (metric.name) {
    case "Next.js-hydration":
      // handle hydration results
      break;
    case "Next.js-route-change-to-render":
      // handle route-change to render results
      break;
    case "Next.js-render":
      // handle render results
      break;
    default:
      break;
  }

  // sending results to analytics
  const body = JSON.stringify(metric);
  const url = "https://example.com/analytics";

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: "POST", keepalive: true });
  }

  // If you use Google Analytics, using the id value can allow you to construct metric distributions manually (to calculate percentiles, etc.)
  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
  window.gtag("event", name, {
    event_category:
      label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });
}

// Persisting layout between page changes
// Keeping state when navigating pages
// Custom error handling using componentDidCatch
// Inject additional data into pages
// Add global CSS
export default function CustomApp({ Component, pageProps }: AppProps) {
  // The Component prop is the active page, so whenever you navigate between routes, Component will change to the new page. Therefore, any props you send to Component will be received by the page.
  return <Component {...pageProps} />; // pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
// When you add getInitialProps in your custom app, you must import App from "next/app", call App.getInitialProps(appContext) inside getInitialProps and merge the returned object into the return value.
// App currently does not support Next.js Data Fetching methods like getStaticProps or getServerSideProps.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }
