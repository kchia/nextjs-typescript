// Static Generation is useful when your pages fetch data from a headless CMS.
// However, it’s not ideal when you’re writing a draft on your headless CMS and want to preview the draft immediately on your page.
// You’d want Next.js to render these pages at request time instead of build time and fetch the draft content instead of the published content.
// You’d want Next.js to bypass Static Generation only for this specific case.

// A simple example for testing it manually from your browser.
// If this is located at pages/api/preview.js, then
// open /api/preview from your browser.
export default function handler(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== "MY_SECRET_TOKEN" || !req.query.slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const post = await getPostBySlug(req.query.slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // sets some cookies on the browser which turns on the preview mode. Any requests to Next.js containing these cookies will be considered as the preview mode, and the behavior for statically generated pages will change (more on this later).
  res.setPreviewData(
    {}, // Currently, preview data is limited to 2KB since the data will be stored in a cookie
    {
      maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
    }
  );
  // If you use your browser’s developer tools, you’ll notice that the __prerender_bypass and __next_preview_data cookies will be set on this request.

  // So now getStaticProps/getServerSideProps will be called at request time instead of at build time.

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(post.slug);
}

// If your headless CMS supports setting custom preview URLs, specify the following as the preview URL: https://<your-site>/api/preview?secret=<token>&slug=<path>
// <token> should be replaced with the secret token you generated.
// <path> should be the path for the page that you want to preview (e.g., `/posts/foo`).

// export async function getStaticProps(context) {
//   // If you request this page with the preview mode cookies set:
//   //
//   // - context.preview will be true
//   // - context.previewData will be the same as
//   //   the argument used for `setPreviewData`. Pass session info here if needed.
// If you’re also using getStaticPaths, then context.params will also be available.
// }

// export async function getStaticProps(context) {
//   // If context.preview is true, append "/preview" to the API endpoint
//   // to request draft data instead of published data. This will vary
//   // based on which headless CMS you're using.
//   const res = await fetch(`https://.../${context.preview ? 'preview' : ''}`)
//   // ...
// }
