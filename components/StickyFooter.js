import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const currentYear = new Date().getFullYear;
const logoPath = "/Logo cartes.dev small.jpg";

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
