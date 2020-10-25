//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

/*
 *
 * Main entry point for the application
 *
 */

import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Link from "next/link";
import cookie from "js-cookie";

function Home() {
  const { data, revalidate } = useSWR("/api/authentication", async function (
    args
  ) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <div>
      <Head>
        <title>Welcome to landing page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Simplest login</h1>

      <h2>Proudly using Next.js, Mongodb and deployed with Now</h2>
      {loggedIn && (
        <>
          <p>Welcome {data.email}!</p>
          <button
            onClick={() => {
              cookie.remove("token");
              revalidate();
            }}
          >
            Logout
          </button>
        </>
      )}
      {!loggedIn && (
        <>
          <Link href="/login">Login</Link>
          <p>or</p>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
}

export default Home;

//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

// import useSWR from "swr";
// import App from "../components/App";
// import Layout from "../components/Layout";
// import Loading from "../components/Loading";
// import Error from "../components/Error";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function Index() {
//   const { data: data, error: error } = useSWR("/api", fetcher);

//   if (error)
//     return (
//       <Layout>
//         <Error />
//       </Layout>
//     );
//   if (!data)
//     return (
//       <Layout>
//         <Loading />
//       </Layout>
//     );

//   return (
//     <Layout>
//       <App notes={data.notes} tasks={data.tasks} />
//     </Layout>
//   );
// }
