import { useEffect, useState } from "react";
import Image from "next/image"; // built-in performance optimizations such as correctly sizing image for each device, visual stability, loading images only when they enter the viewport, on-demand image resizing even for images stored on remote servers.
// https://image-component.nextjs.gallery/
import profilePic from "../public/profile.jpg"; // dynamic await import() or require() not supported

// Client-side data fetching is useful when
// your page doesn't require SEO indexing,
// when you don't need to pre-render your data, or
// when the content of your pages needs to update frequently

// At the component level, the data is fetched at the time of the component mount,
//  and the content of the component is updated as the data changes.

// It's important to note that using client-side data fetching
// can affect the performance of your application and the load speed of your pages.
// This is because the data fetching is done at the time of the
// component or pages mount, and the data is not cached.
export default function Profile() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // client-side data fetching with useEffect
  useEffect(() => {
    setLoading(true);
    fetch("api/profile-data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <Image
        className="profile-image" // recommended way to target image for styling
        src={profilePic} // local image
        alt="Picture of the author"
        // width={500} automatically provided based on the imported file
        // height={500} automatically provided based on the imported file
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
      <Image
        src="/me.png" // remote image URL, default loader in the Next.js web server will automatically request images at different sizes and serve them from Next.js web server
        alt="Picture of the author"
        width={500} // need to specify manually since Next.j does not have access to remote files during the build process
        height={500} // To prevent cumulative layout shift, you can use layout=fill, normalize your images, or modify your API calls to return image dimensions
        priority // priority this image for loading to boost largest contentful paint element
      />
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  );
}

// import useSWR from "swr"; // handles caching, revalidation, focus tracking, refetching on intervals, and more

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

// function Profile() {
//   // SWR will automatically cache the data for us and will revalidate the data if it becomes stale
//   const { data, error } = useSWR("/api/profile-data", fetcher);

//   if (error) return <div>Failed to load</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{data.name}</h1>
//       <p>{data.bio}</p>
//     </div>
//   );
// }
