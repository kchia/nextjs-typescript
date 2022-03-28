import { useState } from "react";

const names = ["Tim", "Joe", "Bel", "Max", "Lee"];

// In the following example, we implement fuzzy search using fuse.js
// and only load the module dynamically in the browser after the user types in the search input
// You can think of dynamic imports as another way to split your code into manageable chunks.
export default function Search() {
  const [results, setResults] = useState();

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget;
          // Dynamically load fuse.js after user types in the search input
          const Fuse = (await import("fuse.js")).default;
          const fuse = new Fuse(names);

          setResults(fuse.search(value));
        }}
      />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}
