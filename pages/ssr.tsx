// In server-side rendering, Next.js pre-renders a page on each request. It will be slower because the page cannot be cached by a CDN, but the pre-rendered page will always be up-to-date.

function Page({ data }) {
  // Render data...
}

// This gets called on every request on the server side, instead of on build time. This function can only be exported from a page.
// Use when you need to pre-render a page whose data must be fetched at request time
// If you do not need to pre-render the data, then you should consider fetching data on the client side
export async function getServerSideProps({ req, res }) {
  // Fetch data from external API
  // You can also call the database directly from inside here
  const response = await fetch(`https://.../data`);
  const data = await response.json();

  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 59 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=59).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  // If an error is thrown inside getServerSideProps, it will show the pages/500.js file.

  // Pass data to the page component via props
  return { props: { data } };
}

export default Page;
