//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

/*
 *
 * Loading Page.
 *
 */

const drawerWidth = 330;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  // necessary for content to be below app bar
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
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" content="h1" className={classes.title}>
            FocusDay
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <main className={classes.content}>
          <Toolbar />
          <Typography
            variant="h4"
            content="h1"
            className={classes.contentTitle}
          >
            Welcome!
          </Typography>
          <Typography
            variant="h6"
            content="h2"
            className={classes.contentTitle}
          >
            Please whait while the data is loading from MongoDB Atlas...
          </Typography>
          <CircularProgress />
        </main>
      </Container>
    </div>
  );
}
