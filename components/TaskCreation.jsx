import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function TaskCreation(props) {
  const [newTask, setNewTask] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setNewTask(newValue);
  }

  return (
    <div>
      <form className="create-task">
        <input onChange={handleChange} type="text" value={newTask} />
        <Zoom in={true}>
          <Fab
            onClick={() => {
              props.onAdd(newTask);
              setNewTask("");
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default TaskCreation;
