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

function ToDoList() {
  const classes = useStyles();
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

  const testingData = [
    "Welcome to your todolist!",
    "Hit the + button to add a new item.",
    "<-- Hit this to delete an item.",
  ];

  const [tasks, setTasks] = useState(testingData);

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
            const labelId = `checkbox-list-label-${index}`;

            return (
              <ListItem
                key={index}
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
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${todoTask}`} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}
// return (
//   <div>
//     <div>
//       <h1>To-Do List</h1>
//     </div>
//     <TaskCreation onAdd={addTask} />
//     <div>
//       <ul>
//         {tasks.map((todoTask, index) => (
//           <Task
//             key={index}
//             id={index}
//             text={todoTask}
//             onChecked={deleteTask}
//           />
//         ))}
//       </ul>
//     </div>
//   </div>
// );

export default ToDoList;
