//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import { useState } from "react";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import TaskCreation from "./TaskCreation";

/*
 *
 * Tasks component, includes:
 * - Task creation component
 * - Task grid
 * - CRUD UI controller functions
 *
 */

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: "absolute",
    right: theme.spacing(4),
  },
  circularProgress: {
    width: 40,
    height: 40,
  },
  heading: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
}));

function Tasks(props) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  // const testingData = [
  //   "Welcome to your todolist!",
  //   "Hit the + button to add a new item.",
  //   "<-- Hit this to complete an item.",
  // ];

  const [tasks, setTasks] = useState(props.tasks);

  /*
   *
   * Add to state (React Hooks) and to DB
   *
   */

  async function addTaskDB(newTask) {
    try {
      const res = await fetch(`/api/tasks/${props.userId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      return res.status;
    } catch (error) {
      console.log(error);
    }
  }
  async function addTask(newTask) {
    if (newTask) {
      setIsLoading(true);
      setTasks((prevTasks) => {
        return [...prevTasks, newTask];
      });
      const status = await addTaskDB(newTask);
      setIsLoading(false);
      if (status !== 201) {
        console.log("addTaskDB " + newTask.text + " FAILURE " + status);
        alert("Error: could not add to database.");
        deleteTask(newTask.id);
        return;
      }
    } else {
      alert("Task field cannot be empty.");
    }
  }

  async function deleteTaskDB(id) {
    try {
      const res = await fetch(`/api/tasks/${props.userId}`, {
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

  async function deleteTask(id) {
    setIsLoading(true);
    const task = tasks.find((task) => {
      return task.id === id;
    });
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => {
        return task.id !== id;
      });
    });
    const status = await deleteTaskDB(id);
    setIsLoading(false);
    if (status === 400) {
      console.log("deleteTaskDB " + id + " FAILURE " + status);
      alert("Error: could not remove from database.");
      addTask(task);
      return;
    }
  }

  /*
   *
   * Checked status state (React Hooks)
   *
   */

  async function toggleCheckedStatusDB(task) {
    try {
      const res = await fetch(`/api/tasks/${props.userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      return res.status;
    } catch (error) {
      console.log(error);
    }
  }

  // Initial array of checked items for the React Hooks checked state
  const initialChecked = [];
  tasks.map((task) => {
    if (task.checked) {
      initialChecked.push(task.id);
    }
  });

  const [checked, setChecked] = useState(initialChecked);

  function handleCheckedList(task) {
    const currentIndex = checked.indexOf(task.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(task.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  }

  /*
   *
   * Handlers for checked tasks state (React Hooks)
   *
   */

  async function handleChecked(task) {
    task.checked = !task.checked;

    setIsLoading(true);

    const currentTasksIndex = tasks.indexOf(task);
    const newTasks = [...tasks];

    newTasks[currentTasksIndex] = {
      ...newTasks[currentTasksIndex],
      checked: !newTasks[currentTasksIndex].checked,
    };

    setTasks(newTasks);
    const status = await toggleCheckedStatusDB(task);

    setIsLoading(false);

    if (status !== 204) {
      console.log("toggleCheckedStatusDB " + task.text + " FAILURE " + status);
      alert("Error: could not modify on database.");
      handleChecked(task);
      return;
    }
  }

  const handleToggle = (task) => () => {
    handleCheckedList(task);
    handleChecked(task);
  };

  /*
   *
   * Delete from state (React Hooks) and from DB
   *
   */

  // Removes all the checked items from the state array and DB
  function clearChecked() {
    checked.map((taskID) => {
      deleteTask(taskID);
    });
    setChecked([]);
  }

  return (
    <div>
      <Grid container direction="row" justify="space-between">
        <Grid item className={classes.heading}>
          <Typography variant="h6" component="h2">
            To-Do List
          </Typography>
        </Grid>
        <Grid item className={classes.circularProgress}>
          {isLoading && <CircularProgress />}
        </Grid>
      </Grid>
      <TaskCreation onAdd={addTask} />
      <div>
        <List className={classes.root}>
          {tasks.map((task, index) => {
            return (
              <ListItem key={index} dense button onClick={handleToggle(task)}>
                <ListItemIcon>
                  <Checkbox
                    className={classes.checkbox}
                    id={task.id}
                    edge="start"
                    checked={checked.indexOf(task.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": task.id }}
                  />
                </ListItemIcon>
                <ListItemText id={task.id} primary={`${task.text}`} />
              </ListItem>
            );
          })}
        </List>
      </div>
      <Zoom in={true}>
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          onClick={clearChecked}
          className={classes.fab}
        >
          Clear
        </Fab>
      </Zoom>
    </div>
  );
}

export default Tasks;
