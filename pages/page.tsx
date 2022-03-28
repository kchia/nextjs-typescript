/**
 * Shallow routing allows you to change the URL without running data
 * fetching methods again, such as getServerSideProps, getStaticProps, and getInitialProps
 */

import { useEffect } from "react";
import { useRouter } from "next/router";

// Current URL is '/'
function Page() {
  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    // The URL will get updated to /?counter=10. and the page won't get replaced, only the state of the route is changed.
    router.push("/?counter=10", undefined, { shallow: true });
  }, []);

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter]);
}

export default Page;
