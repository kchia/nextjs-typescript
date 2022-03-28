import Link from "next/link"; // does client-side route transition
// Any <Link /> in the viewport (initially or through scroll) will be prefetched by default (including the corresponding data) for pages using Static Generation. The corresponding data for server-rendered routes is not prefetched.

function Home() {
  return (
    <ul>
      <li>
        <Link href="/post/abc">
          <a>Go to pages/post/[pid].js</a>
        </Link>
      </li>
      <li>
        {/* pages/posts/[pid].js. */}
        <Link href="/post/abc?foo=bar">
          <a>Also goes to pages/post/[pid].js</a>
        </Link>
      </li>
      <li>
        {/* pages/posts/[pid]/[comment].js */}
        <Link href="/post/abc/a-comment">
          <a>Go to pages/post/[pid]/[comment].js</a>
        </Link>
      </li>
      {/* Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. `pages/posts/[...slug].js` matches /post/a, but also /post/a/b, /post/a/b/c and so on. */}

      {/* Catch all routes can be made optional by including the parameter in double brackets ([[...slug]]). pages/post/[[...slug]].js will match /post, /post/a, /post/a/b, and so on.*/}
    </ul>
  );
}

export default Home;
