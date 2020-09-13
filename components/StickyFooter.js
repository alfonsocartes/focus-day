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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link color="inherit" href="https://www.cartes.dev/">
        Alfonso Cartes Guilarte (cartes.dev)
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 50,
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Copyright />
    </Container>
  );
}
