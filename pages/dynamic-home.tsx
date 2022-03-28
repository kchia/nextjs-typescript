import { Suspense } from "react";
import dynamic from "next/dynamic";

// In import('path/to/component'), the path must be explicitly written.
// It can't be a template string nor a variable.
// Furthermore the import() has to be inside the dynamic() call for Next.js to be able to match webpack bundles / module ids to the specific dynamic() call and preload them before rendering.
// dynamic() can't be used inside of React rendering as it needs to be marked in the top level of the module for preloading to work, similar to React.lazy.

const DynamicComponent = dynamic(() => import("../components/hello")); // DynamicComponent will be the default component returned by ../components/hello

// An optional loading component can be added to render a loading state while the dynamic component is being loaded.
const DynamicComponentWithCustomLoading = dynamic(
  () => import("../components/hello"),
  { loading: () => <p>Loading...</p> }
);

// You may not always want to include a module on server-side. For example, when the module includes a library that only works in the browser.
const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/hello3"),
  { ssr: false }
);

// Option suspense allows you to lazy-load a component, similar to React.lazy and <Suspense> with React 18. Note that it only works on client-side or server-side with fallback.
const DynamicLazyComponent = dynamic(() => import("../components/hello4"), {
  suspense: true,
});

function Home() {
  return (
    <div>
      <DynamicComponent />
      <DynamicComponentWithCustomLoading />
      <DynamicComponentWithNoSSR />
      <Suspense fallback={`loading`}>
        <DynamicLazyComponent />
      </Suspense>
      <p>HOME PAGE is here!</p>
    </div>
  );
}

export default Home;
