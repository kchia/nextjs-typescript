// Create own request type with extra properties

import { NextApiRequest, NextApiResponse } from "next";
import { withFoo } from "external-lib-foo";

// Keep in mind this is not safe since the code will still compile even if you remove withFoo() from the export.
type NextApiRequestWithFoo = NextApiRequest & {
  foo: (bar: string) => void;
};

const handler = (req: NextApiRequestWithFoo, res: NextApiResponse) => {
  req.foo("bar"); // we can now use `req.foo` without type errors
  res.end("ok");
};

export default withFoo(handler);
