import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "next/Link";
import Layout from "../components/Layout";

const drawerWidth = 330;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
    padding: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
export default function About() {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h4" content="h1" className={classes.title}>
              About
            </Typography>
            <Link href="/">
              <Button color="inherit">Back Home</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <main className={classes.content}>
            <Toolbar />
            <Typography variant="h4" content="h1" className={classes.title}>
              About FocusDay
            </Typography>
            <Typography variant="body2" content="p" className={classes.title}>
              <p>
                FocusDay is a DEMO web app to showcase web development
                technologies such as:
              </p>
              <ul>
                <li>ReactJS</li>
                <li>React Hooks</li>
                <li>NextJS</li>
                <li>Mongoose</li>
                <li>NodeJS</li>
                <li>MongoDB</li>
                <li>Material-UI</li>
              </ul>
              <p>
                FocusDay let's you create ToDos and Notes and saves them in a
                database. It uses React Hooks to keep the state of the app and
                also saves it in a MongoDB database.
              </p>
              <p>
                This Web App was made by <b>Alfonso Cartes Guilarte</b>. For
                more information{" "}
                <a target="_blank" href="https://www.cartes.dev">
                  click here
                </a>
              </p>
              <p>
                The source code for the app can be found on{" "}
                <a target="_blank" href="">
                  Github
                </a>
              </p>
            </Typography>
          </main>
        </Container>
      </div>
    </Layout>
  );
}
