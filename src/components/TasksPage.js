import React, { Component } from 'react';         // This component needs to manage local state when you introduce the new task form.
import TaskList from './TaskList';                // For that reason, it’s implemented as an ES6 class

const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed'];   // Tasks can have one of three states

class TasksPage extends Component {     // ES6 classes are used when local state must be managed

  constructor(props) {
    super(props);
    this.state = {                  // It’s often simpler to use React and setState for UI-related state,
      showNewCardForm: false,       // such as whether the form is open and for the current values of the form inputs
      title: '',
      description: '',
    };
  }

  onTitleChange = (e) => {                             //  A special syntax ensures the value of this will be correct
    this.setState({ title: e.target.value });
  }

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  resetForm() {
    this.setState({
      showNewCardForm: false,
      title: '',
      description: '',
    });
  }

  onCreateTask = (e) => {   // Submitting the form is as simple as firing the onCreateTask prop
    e.preventDefault();
    this.props.onCreateTask({
      title: this.state.title,
      description: this.state.description,
    });
    this.resetForm();
  }         // Resets the form’s state after submission

  toggleForm = () => {
    this.setState({ showNewCardForm: !this.state.showNewCardForm });
  }

  renderTaskLists() {
    const { tasks } = this.props;
    return TASK_STATUSES.map(status => {
      const statusTasks = tasks.filter(task => task.status === status);
      return (
        <TaskList
          key={status}
          status={status}
          tasks={statusTasks}
          TaskList
          onStatusChange={this.props.onStatusChange}   // Task is ultimately what calls this.props.onStatusChange with the correct arguments, so TaskList only needs to forward this prop along.
          onRemoveTask={this.props.onRemoveTask}
        />
      );
    });
  }

  render() {
    return (
      <div className="task-list" >
        <div className="task-list-header">
          <button
            className="button button-default"
            onClick={this.toggleForm}
          >
            + New task
          </button>
        </div>
        {this.state.showNewCardForm && (
          <form className="task-list-form" onSubmit={this.onCreateTask}>
            <input
              className="full-width-input"
              onChange={this.onTitleChange}
              value={this.state.title}
              type="text"
              placeholder="title"
            />
            <input
              className="full-width-input"
              onChange={this.onDescriptionChange}
              value={this.state.description}
              type="text"
              placeholder="description"
            />
            <button
              className="button"
              type="submit"
            >
              Save
            </button>
          </form>
        )}

        <div className="task-lists">
          {this.renderTaskLists()}
        </div>
      </div>
    );
  }
}

export default TasksPage;
