//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import { useState } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Note from "./Note";
import NoteCreation from "./NoteCreation";
import { add } from "date-fns";

/*
 *
 * Notes component, includes:
 * - Note creation component
 * - Notes grid
 * - CRUD UI controller functions
 *
 */

const useStyles = makeStyles((theme) => ({
  noteGrid: {
    //backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(4),
  },
}));

function Notes(props) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

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

  /*
   *
   * Add to state (React Hooks) and to DB
   *
   */

  // Function to add a Note to database using API Routes
  async function addNoteDB(newNote) {
    try {
      const res = await fetch(`/api/notes/${props.userId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      return res.status;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to add a Note notes state array and Database.
  async function addNote(newNote) {
    if (newNote.title && newNote.content) {
      setIsLoading(true);
      setNotes((prevNotes) => {
        return [...prevNotes, newNote];
      });
      const status = await addNoteDB(newNote);
      setIsLoading(false);
      if (status !== 201) {
        console.log("addNoteDB " + newNote.title + " FAILURE " + status);
        alert("Error: could not add to database.");
        // If the note was not saved in the DB, remove from UI.
        deleteNote(newNote);
        return;
      }
    } else {
      alert("Note title and content are required.");
    }
  }

  /*
   *
   * Delete from state (React Hooks) and from DB
   *
   */

  // Function to delete a note from DB using the ID
  async function deleteNoteDB(id) {
    try {
      const res = await fetch(`/api/notes/${props.userId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(id) {
    setIsLoading(true);
    const note = notes.find((note) => {
      return note.id === id;
    });
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => {
        return note.id !== id;
      });
    });
    const status = await deleteNoteDB(id);
    setIsLoading(false);

    if (status === 400) {
      console.log("deleteNoteDB  " + id + " FAILURE " + status);
      alert("Error: could not remove from database.");
      // If the note was not deleted in the DB, add it back to the UI.
      addNote(note);
      return;
    }
  }

  return (
    <div>
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Typography variant="h6" component="h2">
            Notes
          </Typography>
        </Grid>
        <Grid item>{isLoading && <CircularProgress />}</Grid>
      </Grid>
      <NoteCreation onAdd={addNote} />
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
