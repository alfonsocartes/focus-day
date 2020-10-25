//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import Link from "next/link";
import cookie from "js-cookie";
import Layout from "../components/Layout";
import Bar from "../components/Bar";
import Loading from "../components/Loading";
import Error from "../components/Error";
import LogIn from "../components/LogIn";

/*
 *
 * Main entry point for the application
 *
 */

function Home() {
  const { data, revalidate, error: error } = useSWR(
    "/api/authentication",
    async function (args) {
      const res = await fetch(args);
      return res.json();
    }
  );

  if (error)
    return (
      <Layout>
        <Bar />
        <Error />
      </Layout>
    );

  if (!data)
    return (
      <Layout>
        <Bar />
        <Loading />
      </Layout>
    );

  let loggedIn = false;

  if (data.email) {
    loggedIn = true;
  }

  return (
    <Layout>
      <Bar />
      <div>
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
            <LogIn />
          </>
        )}
      </div>
    </Layout>
  );
}

export default Home;

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
