import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <IconButton aria-label="delete" onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default Note;
