import Document, { Html, Head, Main, NextScript } from "next/document";

// By default, Next.js will automatically inline font CSS at build time, eliminating an extra round trip to fetch font declarations.
class MyDocument extends Document {
  render() {
    return (
      <Html>
        {/* To add a web font to your Next.js application, add the font to a Custom Document. Automatic Webfont Optimization currently supports Google Fonts and Typekit with support for other font providers coming soon. Font Optimization does not currently support self-hosted fonts.*/}
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
