import { useState } from "react";
import Task from "./Task";
import TaskCreation from "./TaskCreation";

function ToDoList() {
  const [tasks, setTasks] = useState([]);

  function addTask(newTask) {
    setTasks((prevItems) => {
      return [...prevItems, newTask];
    });
  }

  function deleteTask(id) {
    setTasks((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="todo-container">
      <div>
        <h1>To-Do List</h1>
      </div>
      <TaskCreation onAdd={addTask} />
      <div>
        <ul>
          {tasks.map((todoTask, index) => (
            <Task
              key={index}
              id={index}
              text={todoTask}
              onChecked={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
