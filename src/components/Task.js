import React from 'react';

const TASK_STATUSES = [                   // Defines the list of possible statuses as a variable for clarity convenience
  'Unstarted',
  'In Progress',
  'Completed'
]

const Task = props => {
  function onStatusChange(e) {           // Calls onStatusChange with the ID of the updated task and the value of the new status
    props.onStatusChange(props.task.id, e.target.value)
  }

  function onRemoveTask(e) {           // Calls onStatusChange with the ID of the task to be removed
    props.onRemoveTask(props.task)
  }

  return (
    <div className="task">
      <div className="task-header">
        <div>
          <table>
          <tbody>
          <tr>
            <td width="33%"></td>
            <td width="33%" align="right">
              <select className="statusDropDown" value={props.task.status} onChange={onStatusChange}> {/*Adds a callback to run when the drop-down’s change event fires*/}
                {TASK_STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </td>
            <td width="33%" align="right">
              <img src="./images/cross.jpg" alt="Remove Task" onClick={onRemoveTask}></img>
            </td>
          </tr>
          <tr>
          <td>
          {props.task.title}
          </td>
        </tr>
        </tbody>
        </table>
        </div>
      </div>
      <hr />
      <div className="task-body">{props.task.description}</div>
    </div>
  );
}

//// Adds the status drop-down using the select and option elements

export default Task;

/*


    Add a select input with the three available statuses. Tasks already have a status field, and you can declare the possible states as a constant.
    When the user chooses a new status, dispatch an EDIT_TASK action with two pieces of data: the id of the task being updated and the desired status.
    The tasks reducer should handle EDIT_TASK, update the status of the correct task, and return the updated state tree.
    The view should re-render with the newly updated status.

    Have you noticed how you tend to implement features in a particular order?
    It lines up nicely with the idea of a unidirectional data flow, one of the fundamental ideas in React and Redux.
    A user interaction triggers an action, you handle the action, and close the loop by re-rendering the view with any updated state.
*/

// This wil be a stateless functional component. Introduced in React v0.14.
// They don’t have access to lifecycle methods such as componentDidMount, only accept props, don’t use this.state or this.setState,
// and they’re defined as plain functions instead of with createReactClass or ES2015 classes
// These kinds of components are wonderfully simple; you don’t have to worry about this, they’re easier to work with and test, and they
// cut down on the number of lines of code you might need with classes. They accept props as input and return some UI
// (presentational component)
