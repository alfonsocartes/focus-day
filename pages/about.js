import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
            <Button color="inherit">
              <Link href="/">
                <a>Back Home</a>
              </Link>
            </Button>
            <Typography variant="h4" content="h1" className={classes.title}>
              Focus Day
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Toolbar />
          <Typography variant="h4" content="h1" className={classes.title}>
            About Page
          </Typography>
        </main>
      </div>
    </Layout>
  );
}
