import { useState } from "react";
import Note from "./Note";
import NoteCreation from "./NoteCreation";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  noteGrid: {
    //backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(4),
  },
}));

function Notes(props) {
  const classes = useStyles();
  // const testingData = [
  //   {
  //     title: "Test 0",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //   },
  //   {
  //     title: "Test 1",
  //     content:
  //       "Lorem ipsum dolor sit amet, re magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //   },
  //   {
  //     title: "Test 2",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //   },
  // ];

  const [notes, setNotes] = useState(props.notes);

  async function addNoteDB(newNote) {
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
    } catch (error) {
      console.log(error);
    }
  }

  function addNote(newNote) {
    if (newNote.title && newNote.content) {
      addNoteDB(newNote);
      setNotes((prevNotes) => {
        return [...prevNotes, newNote];
      });
    } else {
      alert("Note title and content are required.");
    }
  }

  async function deleteNoteDB(id) {
    console.log(id);
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => {
        return note.id !== id;
      });
    });
    deleteNoteDB(id);
  }

  return (
    <div>
      <Typography variant="h6" component="h2">
        Notes
      </Typography>
      {/* <NoteCreation onAdd={addNote} /> */}
      <div className={classes.noteGrid}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
          spacing={4}
        >
          {notes.map((note, index) => {
            return (
              <Grid item xs key={index}>
                <Note
                  key={index}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  onDelete={deleteNote}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default Notes;
