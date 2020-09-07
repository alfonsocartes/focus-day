import { useState } from "react";
import Notes from "./Notes";
import ToDoList from "./ToDoList";

function App() {
  return (
    <div>
      <div>
        <ToDoList />
      </div>
      <div>
        <Notes />
      </div>
    </div>
  );
}

export default App;
