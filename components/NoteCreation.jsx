import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

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
    right: theme.spacing(1),
  },
}));

function NoteCreation(props) {
  const classes = useStyles();
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function addNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  //TODO: add UUID instead of index

  return (
    <Container component="main" maxWidth="xs">
      {isExpanded && (
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
      )}
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="content"
        onClick={expand}
        onChange={handleChange}
        value={note.content}
        placeholder="Add a note..."
        multiline={isExpanded}
        rows={isExpanded ? 5 : 1}
      />
      <Zoom in={isExpanded}>
        <Fab
          className={classes.fab}
          size="small"
          color="primary"
          aria-label="add"
          onClick={addNote}
        >
          <AddIcon />
        </Fab>
      </Zoom>
    </Container>
  );
}

export default NoteCreation;
