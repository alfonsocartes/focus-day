function Task(props) {
  return (
    <div>
      <li>
        <input
          type="checkbox"
          onClick={() => {
            props.onChecked(props.id);
          }}
        />
        {props.text}
      </li>
    </div>
  );
}

export default Task;
