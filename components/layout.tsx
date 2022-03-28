import useSWR from "swr";
import Navbar from "./navbar";
import Footer from "./footer";

// If you edit a file with exports that aren't React components,
// Fast Refresh will re-run both that file, and the other files importing it.
// So if both Button.js and Modal.js import theme.js, editing theme.js will update both components.
export default function Layout({ children }) {
  const { data, error } = useSWR("/api/navigation", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Navbar links={data.links} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
