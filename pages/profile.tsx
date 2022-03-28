// Alternative: Use static generation to server-render a loading state, followed by fetching user data client-side.

import withSession from "../lib/session";
// import useUser from "../lib/useUser"; // alternative: client side fetching of user data
import Layout from "../components/layout";

// More at https://nextjs.org/docs/authentication
// If you want a low-level, encrypted, and stateless session utility use iron-session.
// If you want a full-featured authentication system with built-in providers (Google, Facebook, GitHub…), JWT, JWE, email/password, magic links and more… use next-auth.

export default function Profile() {
  // Fetch the user client-side
  // const { user } = useUser({ redirectTo: "/login" }); // alternative

  // Server-render loading state
  // if (!user || user.isLoggedIn === false) { // alternative
  //   return <Layout>Loading...</Layout>;
  // }

  // Once the user request finishes, show the user
  return (
    <Layout>
      <h1>Your Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
}

// If getServerSideProps or getInitialProps is present in a page, Next.js will switch to render the page on-demand, per-request (meaning Server-Side Rendering).
// If the above is not the case, Next.js will statically optimize your page automatically by prerendering the page to static HTML.
// Fetch user data server-side to eliminate a flash of unauthenticated content.
// It's important to note fetching user data in getServerSideProps
// will block rendering until the request to your authentication
// provider resolves. To prevent creating a bottleneck and increasing
// your TTFB (Time to First Byte), you should ensure your authentication lookup is fast.
export const getServerSideProps = withSession(async function ({ req, res }) {
  const { user } = req.session;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
});
