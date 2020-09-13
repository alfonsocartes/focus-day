//  Created by Alfonso Cartes.
//  Copyright © Alfonso Cartes. All rights reserved.

/*
 *
 * Task Component.
 * A single Task component
 * To see it in context, please take a look at /components/ToDoList.jsx
 *
 */

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
