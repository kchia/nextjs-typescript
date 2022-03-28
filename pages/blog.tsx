import { GetStaticProps, GetStaticPaths } from "next";
import Script from "next/script"; // enables developers to set the loading priority of third-party scripts anywhere in their application, outside next/head, saving developer time while improving loading performance.

import { loadPosts } from "../lib/load-posts";

// Your page content depends on external data. Here's an example of static generation with data. You can pre-render this page ahead of the user's request.

function Blog({ posts }) {
  return (
    <>
      {/* Inline scripts, or scripts not loaded from an external file, are also
      supported by the Script component. Two limitations: must define an id, and only the afterInteractive and lazyOnLoad strategies can be used */}
      <Script id="show-banner" strategy="lazyOnload">
        {`document.getElementById('banner').classList.remove('hidden')`}
      </Script>
      <Script
        id="show-banner"
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('banner').classList.remove('hidden')`,
        }}
      />
      {/* Three difference loading strategies:
        - beforeInteractive: use for critical scripts that need to be fetched and executed before self bundled JS is executed, such as bot detectors and cookie consent managers
        - afterInteractive (default): used for scripts that do not need to load as soon as possible and can be fetched and executed immediately after the page is interactive, such as tag managers and analytics
        - lazyOnLoad (load during idle time): used for background or low priority scripts that do not need to load before or immediately after a page becomes interactive, such as chat support plugins and social media widgets
        - worker (experimental): load and execute scripts in a web worker using Partytown
      */}
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
      />
      <Script
        id="stripe-js"
        src="https://js.stripe.com/v3/"
        onLoad={() => {
          setStripe({ stripe: window.Stripe("pk_test_12345") });
        }}
      />
      <Script
        id="will-fail"
        src="https://example.com/non-existant-script.js"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
      />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths(): GetStaticPaths {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

// // This function runs only on the server side
// export async function getStaticProps() {
//   // Instead of fetching your `/api` route you can call the same
//   // function directly in `getStaticProps`
//   const posts = await loadPosts()

//   // Props returned will be passed to the page component
//   return { props: { posts } }
// }

// This function gets called at build time
// It may get called again if revalidation is enabled and a new request comes in
// When a page with getStaticProps is pre-rendered at build time,
// in addition to the page HTML file, Next.js generates a JSON file holding the result of running getStaticProps.
// the JSON file contains the props for rendering the component
// in development, it's called on every request
export async function getStaticProps(): GetStaticProps {
  // Call an external API endpoint to get posts
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  if (!response.ok) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(
      `Failed to fetch posts, received status ${response.status}`
    );
  }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // in seconds. If you set to 60, all visitors will see the same generated version of your site for one minute. The only way to invalidate the cache is from someone visiting that page after the minute has passed. Starting v12.1.0, Next.js supports on-demand incremental static regeneration to manually purge the Next.js cache for a specific page, so your site is updated when content is create or updated
    // When a request is made to a page that was pre-rendered at build time, it will initially show the cached page.
    // Any requests to the page after the initial request and before 10 seconds are also cached and instantaneous.
    // After the 10-second window, the next request will still show the cached (stale) page
    // Next.js triggers a regeneration of the page in the background.
    // Once the page generates successfully, Next.js will invalidate the cache and show the updated page. If the background regeneration fails, the old page would still be unaltered.
  };
}

export default Blog;
