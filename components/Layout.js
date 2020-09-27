//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import StickyFooter from "./StickyFooter";

/*
 *
 * Layout Component.
 * To see it in context, please take a look at /index.js and /about.js
 *
 */

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[800],
    alignItems: "right",
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <title>FocusDay - Take Notes and add TODOs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Container component="main">
        <main>{children}</main>
      </Container>
      <footer className={classes.footer}>
        <StickyFooter />
      </footer>
    </div>
  );
}
