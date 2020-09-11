import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { red } from "@material-ui/core/colors";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 375,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
    marginBottom: theme.spacing(2),
  },
  cardActions: {
    padding: theme.spacing(0),
  },
}));

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h6" component="h4">
          {props.title}
        </Typography>
        <Typography variant="body2" component="p">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <IconButton aria-label="delete" onClick={handleClick}>
          <DeleteIcon style={{ color: red[300] }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Note;
