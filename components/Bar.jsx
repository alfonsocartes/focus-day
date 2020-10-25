//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Notes from "./Notes";
import Tasks from "./Tasks";

/*
 *
 * Main container - body for the applications.
 * It includes the Notes component and the Tasks component
 *
 */

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
  aboutButton: {
    marginLeft: "auto",
  },
}));

function Bar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" content="h1" noWrap>
            FocusDay - Take Notes and add TODOs
          </Typography>

          <Link href="/about">
            <Button className={classes.aboutButton} color="inherit">
              About
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Bar;
