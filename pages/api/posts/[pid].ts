// API routes support dynamic routes, and follow the same file naming rules used for pages.

// A request to /api/posts/abc will respond with the text: Post: abc.
export default function handler(req, res) {
  const { pid } = req.query;
  res.end(`Post: ${pid}`);
}
