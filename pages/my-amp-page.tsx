import Head from "next/head";

export const config = { amp: true }; // Next.js will automatically import all components used on a page and there is no need to manually import AMP component scripts

// This example uses the amp-timeago component.
export default function MyAmpPage() {
  const date = new Date();

  return (
    <div>
      {/* // By default, the latest version of an amp component is always imported. If you want to customize the version, you can use next/head */}
      <Head>
        <script
          async
          key="amp-timeago"
          custom-element="amp-timeago"
          src="https://cdn.ampproject.org/v0/amp-timeago-0.1.js"
        />
      </Head>

      <p>Some time: {date.toJSON()}</p>
      <amp-timeago
        width="0"
        height="15"
        datetime={date.toJSON()}
        layout="responsive"
      >
        .
      </amp-timeago>
    </div>
  );
}
