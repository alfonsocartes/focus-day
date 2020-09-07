import { useState } from "react";
import Note from "./Note";
import NoteCreation from "./NoteCreation";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function Notes() {
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

  const [notes, setNotes] = useState(testingData);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
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
          {notes.map((noteItem, index) => {
            const labelId = `checkbox-list-label-${index}`;
            return (
              <Grid item xs={4} key={index}>
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.content}
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
