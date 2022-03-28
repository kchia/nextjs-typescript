// Note that this page does not need to fetch any external data to be pre-rendered.
// In cases like this, Next.js generates a single HTML file per page during build time.

// We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN,
// which makes it much faster than having a server render the page on every request.

// You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation.

// Fast Refresh tries to preserve local React state in the component you're editing, but only if it's safe to do so.
// If you edit a file that only exports React component(s), Fast Refresh will update the code only for that file, and re-render your component. You can edit anything in that file, including styles, rendering logic, event handlers, or effects.
// If local state is being reset on every edit, note that local state is not preserved for class components, the file you're editing might have other exports in addition to a React component, and you might be using anon arrow functions. Fast Refresh preserves React local state in function components (and hooks) by default
// You can add @refresh reset to force Fast Refresh to remount components defined in a file on every edit
export default function About() {
  return <div>About</div>;
}
