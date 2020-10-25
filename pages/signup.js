//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

// import Layout from "../components/Layout";
// import SignUp from "../components/SignUp";

// /*
//  *
//  * Sign Up
//  *
//  */

// export default function Login() {
//   return (
//     <Layout>
//       <SignUp />
//     </Layout>
//   );
// }

import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";

const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/authentication/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set("token", data.token, { expires: 2 });
          Router.push("/");
        }
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Sign Up</p>
      <label htmlFor="email">
        email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
        />
      </label>

      <br />

      <label for="password">
        password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
        />
      </label>

      <br />

      <input type="submit" value="Submit" />
      {signupError && <p style={{ color: "red" }}>{signupError}</p>}
    </form>
  );
};

export default Signup;
