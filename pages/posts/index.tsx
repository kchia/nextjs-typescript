import Link from "next/link";

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {/* You can also use interpolation to create the path, which comes in handy for dynamic route segments. */}
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            <a>{post.title}</a>
          </Link>
          {/* Alternative Syntax */}
          <Link
            href={{
              pathname: "/blog/[slug]", // name of the page in the pages directory
              query: { slug: post.slug }, // object with the dynamic segment
            }}
          >
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
