//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import cookie from "js-cookie";

import LoadUserData from "./api/load";

import Layout from "../components/Layout";
import Bar from "../components/Bar";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Welcome from "../components/Authentication/Welcome";

/*
 *
 * Main entry point for the application
 *
 */

const fetcher = (url) => fetch(url).then((res) => res.json());

function Home() {
  const { data: data, revalidate, error: error } = useSWR(
    "/api/authentication",
    fetcher
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

  if (loggedIn) {
    return (
      <LoadUserData
        data={data}
        onLogoutClick={() => {
          loggedIn = false;
          cookie.remove("token");
          revalidate();
        }}
      />
    );
  } else {
    return (
      <Layout>
        <Bar />
        <Welcome />
      </Layout>
    );
  }
}

export default Home;
