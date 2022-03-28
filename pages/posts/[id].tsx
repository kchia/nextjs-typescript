// Your page paths depend on external data. Which id you want to pre-render at build time might depend on external data.

export default function Post({ post }) {
  // Render post...
}

// This function gets called at build time in production. It will not be called during runtime.
// Use when the data comes from a headless CMS, database, filesystem, can be publicly cached (not user specific), the page must be pre-rendered (for SEO) and be very fast
// in development, it's called on every request
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  // Get a list of paths we want to pre-render/statically generate based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }; // true or "blocking"
}

// This also gets called at build time in production
// runs during `next build`
// Use if the data required to render the page is available at build time ahead of a user's request
// When combined with incremental static regeneration, will run in the background while the stale page is revalidated, and the fresh page served to the browser
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts${params.id}`
  );
  const post = await response.json();

  // Pass post data to the page via props
  return { props: { post } };
}
