import type { ReactElement } from "react";
import Layout from "../components/layout";
import NestedLayout from "../components/nested-layout";
import setupAnalyticsService from "../lib/my-analytics-service";

// NEXT_PUBLIC_ANALYTICS_ID can be used here as it's prefixed by NEXT_PUBLIC_
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID);

export default function Page() {
  return {
    /** Your content */
  };
}

// Note: If you are using a /src folder, please note that Next.js will
// load the .env files only from the parent folder and not from the /src folder.
// variables are loaded at build time from .env.local
export async function getStaticProps() {
  const db = await myDB.connect({
    host: process.env.DB_HOST, // cannot destructure process.env
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  });
  // ...
}

// getLayout allows you to return a React component for the layout on a per-page basis
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};
