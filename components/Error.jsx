//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

/*
 *
 * Error while loading Page.
 *
 */

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  contentTitle: {
    marginBottom: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <main className={classes.content}>
          <Toolbar />
          <Typography
            variant="h4"
            content="h1"
            className={classes.contentTitle}
          >
            Error
          </Typography>
          Could not load the database.
        </main>
      </Container>
    </div>
  );
}
