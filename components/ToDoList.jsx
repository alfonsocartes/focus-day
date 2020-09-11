import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TaskCreation from "./TaskCreation";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function ToDoList(props) {
  const classes = useStyles();

  // const testingData = [
  //   "Welcome to your todolist!",
  //   "Hit the + button to add a new item.",
  //   "<-- Hit this to delete an item.",
  // ];

  const [tasks, setTasks] = useState(props.tasks);

  async function addTaskDB(newTask) {
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  }
  function addTask(newTask) {
    if (newTask) {
      addTaskDB(newTask);
      setTasks((prevTasks) => {
        return [...prevTasks, newTask];
      });
    } else {
      alert("Task cannot be empty.");
    }
  }

  async function deleteTaskDB(id) {
    console.log(id);
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
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

  function deleteTask(id) {
    setNotes((prevTasks) => {
      return prevTasks.filter((task) => {
        return task.id !== id;
      });
    });
    deleteTaskDB(id);
  }

  async function toggleCheckedStatusDB(task) {
    console.log("PUT " + task.text);
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    } catch (error) {
      console.log(error);
    }
  }

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

  function handleModel(task) {
    const currentTasksIndex = tasks.indexOf(task);
    const newTasks = [...tasks];

    console.log("handleToggle");

    newTasks[currentTasksIndex] = {
      ...newTasks[currentTasksIndex],
      checked: !newTasks[currentTasksIndex].checked,
    };

    newTasks.map((task, index) =>
      console.log("newTasks" + index + task.checked)
    );

    setTasks(newTasks);
    tasks.map((task, index) => console.log("tasks" + index + task.checked));

    task.checked = !task.checked;
    toggleCheckedStatusDB(task);
  }

  const handleToggle = (task) => () => {
    handleCheckedList(task);
    handleModel(task);
  };

  // function clearChecked() {
  //   checked.map((taskID) => deleteTask(taskID));
  // }

  return (
    <div>
      <Typography variant="h6" component="h4">
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
        {/* <Zoom in={true} className={classes.fab}>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
            className={classes.margin}
            onClick={() => {
              clearChecked;
            }}
          >
            Clear
          </Fab>
        </Zoom> */}
      </div>
    </div>
  );
}

export default ToDoList;
