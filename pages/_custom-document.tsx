// A custom Document can update the <html> and <body> tags used to render a Page. This file is only rendered on the server, so event handlers like onClick cannot be used in _document.

// import { Html, Head, Main, NextScript } from "next/document"; // <Html>, <Head />, <Main /> and <NextScript /> are required for the page to be properly rendered.

// // Document currently does not support Next.js Data Fetching methods like getStaticProps or getServerSideProps.
// export default function Document() {
//   return (
//     <Html lang="en">
//       {/* The <Head /> component used in _document is not the same as next/head. The <Head /> component used here should only be used for any <head> code that is common for all pages. For all other cases, such as <title> tags, we recommend using next/head in your pages or components. */}
//       <Head />
//       <body className="bg-white">
//         {/* React components outside of <Main /> will not be initialized by the browser. Do not add application logic here or custom CSS (like styled-jsx). If you need shared components in all your pages (like a menu or a toolbar), read Layouts instead. */}
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }

// import Document, { DocumentContext } from "next/document";

// class MyDocument extends Document {
//   static async getInitialProps(ctx: DocumentContext) {
//     const initialProps = await Document.getInitialProps(ctx);

//     return initialProps;
//   }
// }

// export default MyDocument;
