import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next"; // make your response handlers more type-safe

type ResponseData = {
  message: string;
};

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

// Will match with GET api/posts - gets a list of posts, probably paginated
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // API routes provide built in middlewares which parse the incoming request (req).
  // req.cookies - An object containing the cookies sent by the request. Defaults to {}
  // req.query - An object containing the query string. Defaults to {}
  // req.body - An object containing the body parsed by content-type, or null if no body was sent

  // res.status(code), res.json(body), res.send(body), res.redirect(), res.unstable_revalidate(urlPath)

  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  // Send JSON response, serializable object
  res.json({ message: "Hello Everyone!" });
}

export const config = {
  // The api object includes all configs available for API routes.
  api: {
    bodyParser: {
      // the maximum size allowed for the parsed body, in any format supported by bytes,
      sizeLimit: "1mb", // If you want to consume the body as a Stream or with raw-body, you can set this to false.
    },
    // an explicit flag that tells the server that this route is being handled by an external resolver like express or connect.
    externalResolver: true,
    responseLimit: false, // automatically enabled, warning when an API routes' response body is over 4MB. 8mb, 4mb, 500kb etc.
  },
};
