// Any file inside the folder pages/api is mapped to /api/* and
// will be treated as an API endpoint instead of a page.
// They are server-side only bundles and won't increase
// your client-side bundle size.

// For new projects, you can build your entire API with API Routes.
// If you have an existing API, you do not need to forward calls to the API through an API Route.
// Masking the URL of an external service (e.g. /api/secret instead of https://company.com/secret-url)
// Using Environment Variables on the server to securely access external services.

// API Routes do not specify CORS headers,
// meaning they are same-origin only by default.
// You can customize such behavior by wrapping the request handler
// with the CORS middleware.

// req: An instance of http.IncomingMessage, plus some pre-built middlewares
// res: An instance of http.ServerResponse, plus some helper functions
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
