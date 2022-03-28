/**
 * Dynamic Routes
 */

import { useRouter } from "next/router";

// Any route like /posts/1, /posts/abc, etc. will be matched
// For example, the route /post/abc will have the following query object:
// { "pid": "abc" }
// Similarly, the route /post/abc?foo=bar will have the following query object:
// { "foo": "bar", "pid": "abc" }

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Post: {pid}</p>;
};

export default Post;
