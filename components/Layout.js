import React from "react";
import Head from "next/head";
import StickyFooter from "./StickyFooter";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  // main: {
  //   marginTop: theme.spacing(8),
  //   marginBottom: theme.spacing(2),
  // },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[800],
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <title>Focus Day</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Container component="main" className={classes.main}>
        <main>{children}</main>
      </Container>
      <footer className={classes.footer}>
        <StickyFooter />
      </footer>
    </div>
  );
}
