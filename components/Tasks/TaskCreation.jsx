//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import { useState } from "react";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";

/*
 *
 * Task Component.
 * Component to add a new task: ID(UUID), Text
 * To see it in context, please take a look at /components/Tasks.jsx
 *
 */

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fab: {
    top: theme.spacing(3),
    left: theme.spacing(1),
    width: 40,
    height: 40,
  },
  titleTextField: {
    width: "83%",
  },
}));

function TaskCreation(props) {
  const classes = useStyles();

  const [task, setTask] = useState({
    id: "",
    checked: false,
    text: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      };
    });
  }

  function addTask(event) {
    const id = uuidv4();
    const newTask = {
      ...task,
      id: id,
      checked: false,
    };
    //onAdd is a callback function from Tasks component
    props.onAdd(newTask);
    setTask({
      id: "",
      checked: false,
      text: "",
    });

    //event.preventDefault();
  }

  // Adds a new task when enter is pressed (it's an outside function just for code clarity)
  function onKeyDown(event){
    if(event.keyCode == 13) {
      addTask();
    }
  }

  return (
    // TODO: add when pressing enter
    <Container component="main" maxWidth="xs">
      {/* <form noValidate autoComplete="off"> */}
      <TextField
        variant="outlined"
        margin="normal"
        name="text"
        onChange={handleChange}
        onKeyDown={onKeyDown}
        value={task.text}
        placeholder="New ToDo"
        className={(classes.margin, classes.titleTextField)}
      />
      <Zoom in={true} className={classes.fab}>
        <Fab size="small" color="primary" aria-label="add" onClick={addTask}>
          <AddIcon />
        </Fab>
      </Zoom>
      {/* </form> */}
    </Container>
  );
}

export default TaskCreation;
