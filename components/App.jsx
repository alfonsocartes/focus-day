import Notes from "./Notes";
import ToDoList from "./ToDoList";

function App() {
  return (
    <div className="container">
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
