import Notes from "./Notes";
import ToDoList from "./ToDoList";

function App() {
  return (
    <div>
      <div className="container">
        <ToDoList />
      </div>
      <div className="container">
        <Notes />
      </div>
    </div>
  );
}

export default App;
