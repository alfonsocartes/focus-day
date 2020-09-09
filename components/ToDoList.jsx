import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TaskCreation from "./TaskCreation";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

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

  console.log(props.tasks);

  const [tasks, setTasks] = useState(props.tasks);

  function addTask(newTask) {
    setTasks((prevItems) => {
      return [...prevItems, newTask];
    });
  }

  // I will not delete the task because the DB will reset each day
  // function deleteTask(id) {
  //   setTasks((prevItems) => {
  //     return prevItems.filter((item, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  //TODO: index must be UUID, not index. It doesnt work with a check box

  return (
    <div>
      <Typography variant="h6" component="h4">
        To-Do List
      </Typography>

      <TaskCreation onAdd={addTask} />
      <div>
        <List className={classes.root}>
          {tasks.map((todoTask, index) => {
            return (
              <ListItem
                key={todoTask._id}
                role={undefined}
                dense
                button
                onClick={handleToggle(index)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(index) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": todoTask._id }}
                  />
                </ListItemIcon>
                <ListItemText id={todoTask._id} primary={`${todoTask.text}`} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default ToDoList;
