import { useState } from "react";
import Task from "./Task";
import TaskCreation from "./TaskCreation";

function ToDoList() {
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

  function deleteTask(id) {
    setTasks((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  //TODO: index must be UUID, not index. It doesnt work with a check box

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
