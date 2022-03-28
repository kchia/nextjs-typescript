// By default, no expiration date is set for Preview Mode cookies, so the preview session ends when the browser is closed.

// To clear the Preview Mode cookies manually, create an API route that calls clearPreviewData():
export default function handler(req, res) {
  // If calling this route using next/link, you must pass prefetch={false} to prevent calling clearPreviewData during link prefetching
  res.clearPreviewData();
}
