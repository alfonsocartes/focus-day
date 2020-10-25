//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

/*
 *
 * StickyFooter Component.
 * To see it in context, please take a look at the Layout component
 *
 */

const useStyles = makeStyles((theme) => ({
  alignment: {
    padding: theme.spacing(1),
    textAlign: "end",
  },
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography
      className={classes.alignment}
      variant="body2"
      color="textSecondary"
    >
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link color="inherit" href="https://www.cartes.dev/">
        Alfonso Cartes Guilarte
      </Link>
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Container maxWidth="xl">
      <Copyright />
    </Container>
  );
}
