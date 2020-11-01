//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import cookie from "js-cookie";

import LoadUserData from "./load";
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

  console.log("CHECKING FOR EMAIL IN DATA RESPONSE FROM TOKEN AUTHENTICATION");
  if (data.email) {
    console.log("EMAIL IN DATA RESPONSE FROM TOKEN AUTHENTICATION FOUND");
    loggedIn = true;
  }

  if (loggedIn) {
    return (
      <LoadUserData
        email={data.email}
        onLogoutClick={() => {
          console.log("@@@@@ REMOVING COOKIE");
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
