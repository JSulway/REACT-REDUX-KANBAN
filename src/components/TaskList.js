import React from 'react';
import Task from './Task';

const TaskList = props => {
  return (
    <div className="task-list">
      <div className="task-list-title">
        <strong>{props.status}</strong>
      </div>
      {props.tasks.map(task => (
        <Task key={task.id} task={task} onStatusChange={props.onStatusChange} onRemoveTask={props.onRemoveTask}/> // onStatusChange needs to be passed once more as a prop to reach Task.
      ))}
    </div>
  );
}

export default TaskList;


// This wil be a stateless functional component. Introduced in React v0.14.
// They don’t have access to lifecycle methods such as componentDidMount, only accept props, don’t use this.state or this.setState,
// and they’re defined as plain functions instead of with createReactClass or ES2015 classes
// These kinds of components are wonderfully simple; you don’t have to worry about this, they’re easier to work with and test, and they
// cut down on the number of lines of code you might need with classes. They accept props as input and return some UI
// (presentational component)
