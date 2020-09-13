//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

import { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import TaskCreation from "./TaskCreation";

/*
 *
 * ToDoList component, includes:
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
}));

function ToDoList(props) {
  const classes = useStyles();

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
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      console.log("POST STATUS " + res.status);
      return res.status;
    } catch (error) {
      console.log(error);
    }
  }
  async function addTask(newTask) {
    if (newTask) {
      const status = await addTaskDB(newTask);
      if (status !== 201) {
        console.log("addTaskDB " + newTask.text + " FAILURE " + status);
        alert("Error: could not add to database.");
        return;
      } else {
        setTasks((prevTasks) => {
          return [...prevTasks, newTask];
        });
      }
    } else {
      alert("Task field cannot be empty.");
    }
  }

  /*
   *
   * Checked status state (React Hooks)
   *
   */

  async function toggleCheckedStatusDB(task) {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      console.log("PUT STATUS " + res.status);
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

  async function handleModel(task) {
    task.checked = !task.checked;

    const status = await toggleCheckedStatusDB(task);
    if (status !== 204) {
      console.log("toggleCheckedStatusDB " + task.text + " FAILURE " + status);
      alert("Error: could not modify on database.");
      return;
    } else {
      const currentTasksIndex = tasks.indexOf(task);
      const newTasks = [...tasks];

      newTasks[currentTasksIndex] = {
        ...newTasks[currentTasksIndex],
        checked: !newTasks[currentTasksIndex].checked,
      };

      setTasks(newTasks);
    }
  }

  const handleToggle = (task) => () => {
    handleCheckedList(task);
    handleModel(task);
  };

  /*
   *
   * Delete from state (React Hooks) and from DB
   *
   */

  async function deleteTaskDB(id) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
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

  async function deleteTask(id) {
    const status = await deleteTaskDB(id);
    if (status !== 200) {
      console.log("deleteTaskDB " + id + " FAILURE " + status);
      alert("Error: could not remove from database.");
      return;
    } else {
      setTasks((prevTasks) => {
        return prevTasks.filter((task) => {
          return task.id !== id;
        });
      });
    }
  }

  // Removes all the checked items from the state array and DB
  function clearChecked() {
    checked.map((taskID) => console.log("clearChecked taskID " + taskID));

    checked.map((taskID) => {
      deleteTask(taskID);
    });
    setChecked([]);
  }

  return (
    <div>
      <Typography variant="h6" component="h2">
        To-Do List
      </Typography>
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

export default ToDoList;
