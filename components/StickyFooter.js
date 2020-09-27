//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

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
        Alfonso Cartes Guilarte
      </Link>
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Container maxWidth="sm">
      <Copyright />
    </Container>
  );
}
