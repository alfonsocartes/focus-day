//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import useSWR from "swr";
import App from "../components/App";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Error from "../components/Error";

/*
 *
 * Main entry point for the application
 *
 */

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data: data, error: error } = useSWR("/api", fetcher);

  if (error)
    return (
      <Layout>
        <Error />
      </Layout>
    );
  if (!data)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <App notes={data.notes} tasks={data.tasks} />
    </Layout>
  );
}
