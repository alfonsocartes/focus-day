import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  fab: {
    top: theme.spacing(3),
    left: theme.spacing(1),
  },
}));

function TaskCreation(props) {
  const classes = useStyles();
  const [newTask, setNewTask] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setNewTask(newValue);
  }

  //TODO: add UUID instead of index

  return (
    <Container component="main" maxWidth="xs">
      <TextField
        variant="outlined"
        margin="normal"
        name="title"
        onChange={handleChange}
        value={newTask}
        placeholder="New ToDo"
        className={classes.margin}
      />
      <Zoom in={true} className={classes.fab}>
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => {
            props.onAdd(newTask);
            setNewTask("");
          }}
        >
          <AddIcon />
        </Fab>
      </Zoom>
    </Container>
  );
}

export default TaskCreation;
