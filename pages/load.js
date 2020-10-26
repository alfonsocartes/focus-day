//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import useSWR from "swr";
import App from "../components/App";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Bar from "../components/Bar";

/*
 *
 * Main entry point for the application
 *
 */

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LoadUserData(props) {
  const { data: data, error: error } = useSWR("/api", fetcher);

  console.log("@@@@@@@@@@@@@@@@@@@@@@@ LOAD props");
  console.log(props);

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

  return (
    <Layout>
      <App
        notes={data.notes}
        tasks={data.tasks}
        onLogoutClick={props.onLogoutClick}
      />
    </Layout>
  );
}
