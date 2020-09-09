import { useState } from "react";
import Note from "./Note";
import NoteCreation from "./NoteCreation";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function Notes(props) {
  const testingData = [
    {
      title: "Test 0",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Test 1",
      content:
        "Lorem ipsum dolor sit amet, re magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Test 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const [notes, setNotes] = useState(props.notes);

  async function addNoteDB(newNote) {
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
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
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    addNoteDB(newNote);
  }

  async function deleteNoteDB(id) {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
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
        return note._id !== id;
      });
    });
    deleteNoteDB(id);
  }

  return (
    <div>
      <Typography variant="h6" component="h4">
        Notes
      </Typography>
      <NoteCreation onAdd={addNote} />
      <div>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
          spacing={4}
        >
          {notes.map((note) => {
            return (
              <Grid item xs={4} key={note._id}>
                <Note
                  key={note._id}
                  id={note._id}
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
