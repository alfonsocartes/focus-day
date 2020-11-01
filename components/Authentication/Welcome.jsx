import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(18),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Welcome() {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Typography
          className={classes.title}
          align="center"
          component="h1"
          variant="h4"
        >
          Welcome to FocusDay
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Link href="/login">
              <Button fullWidth variant="contained" color="primary">
                Sign In
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link href="/signup">
              <Button fullWidth variant="contained" color="primary">
                Sign Up
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
