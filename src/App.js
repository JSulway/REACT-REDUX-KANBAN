import React, { Component } from 'react';
import TasksPage from './components/TasksPage';
import { connect } from 'react-redux';  // Adds connect to the list of imports
import './App.css';
import { createTask, editTask, removeTask, fetchTasks } from './actions'; // Imports the action creator
                                              // >>>> import fetchTasks - Imports the fetchTasks action creator from the actions module

/*
To recap, the App container component has access to the  method, thanks to connect.
App imports an action creator, createTask, and passes it a title and a description. The action creator formats and returns an action
Next its onto the reducer and beyond.
*/

                                        // Tasks will be available via props after connected to the store
class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchTasks());  // Dispatches the fetchTasks action from componentDidMount
  }

  // Handler for dispatching a CREATE_TASK action
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  }

  onStatusChange = (id, status) => {
   this.props.dispatch(editTask(id, { status }));       // Creates the onStatusChange handler, which dispatches the editTask action creator
  }

  onRemoveTask = (task) => {
   this.props.dispatch(removeTask(task));
  }

  // The onCreateTask handler is passed to TasksPage as a simple callback prop
  render() {
    return (
      <div className="main-content">
        <TasksPage tasks={this.props.tasks} onCreateTask={this.onCreateTask} onStatusChange={this.onStatusChange} onRemoveTask={this.onRemoveTask}/>
      </div>
    );
  }
}

function mapStateToProps(state) {     // The state argument is the entire contents of the Redux store, specifically the result of calling getState on the store instance
  return {
    tasks: state.tasks    // The return value of mapStateToProps is passed into the App component as props, which is why render can reference this.props.tasks
  }
}

export default connect(mapStateToProps)(App);
