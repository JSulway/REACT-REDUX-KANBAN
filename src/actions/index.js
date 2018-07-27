import * as api from '../api';

// CREATE TASK ACTIONS
function createTaskSucceeded(task) {                                 // Creates a NEW SYNCHRONOUS ACTION CREATOR
  return {  type: 'CREATE_TASK_SUCCEEDED', payload: { task,  },  }
}
export function createTask({ title, description, status = 'Unstarted' }) {
  return dispatch => {
    api.createTask({ title, description, status }).then(resp => {
      dispatch(createTaskSucceeded(resp.data));        // Loads the newly created object into the store
    });
  };
}

// EDIT TASK ACTIONS
function editTaskSucceeded(task) {                                 // Creates a NEW SYNCHRONOUS ACTION CREATOR
  return {  type: 'EDIT_TASK_SUCCEEDED', payload: { task,  },  }
}
export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    const task = getTaskById(getState().tasks, id);   // Merges the new properties into the existing task object
    const updatedTask = Object.assign({}, task, params);

    api.editTask(id, updatedTask).then(resp => {
      dispatch(editTaskSucceeded(resp.data));
    });
  };
}
function getTaskById(tasks, id) {
  return tasks.find(task => task.id === id);
}

// REMOVE TASK ACTIONS
function removeTaskSucceeded(task) {                                 // Creates a NEW SYNCHRONOUS ACTION CREATOR
  return {  type: 'REMOVE_TASK_SUCCEEDED', payload: task }
}
export function removeTask(task) {
  return dispatch => {
    api.removeTask(task).then(resp => {
      dispatch(removeTaskSucceeded(task));        // Loads the newly created object into the store
    });
  };
}

// FETCH TASK ACTIONS
export function fetchTasksSucceeded(tasks) {          // A new synchronous action will be dispatched if the request completes successfully.
  return {
    type: 'FETCH_TASKS_SUCCEEDED',
    payload: {
      tasks
    }
  }
}

export function fetchTasks() {
  return dispatch => {                                // fetchTasks returns a function instead of an action.
    //axios.get('http://localhost:3001/tasks')          // Makes the AJAX request
      api.fetchTasks().then(resp => {                   // Uses the friendlier interface for making an AJAX call
        dispatch(fetchTasksSucceeded(resp.data));     // Dispatches a synchronous action creator
      });
  }
}

/*
  Not only are the details of the request safely hidden away, the fetchTasks action creator is also clearer and more concise.
  By extracting an API client, you’ve improved encapsulation, future maintainability, and readability at the cost of the overhead of another module to manage.
  Creating new abstractions isn’t always the right answer, but in this case, it seems like a no-brainer.
*/

/*

  An implementation of fetchTasks that performs the AJAX call
  A new synchronous action creator, fetchTasksSucceeded, to dispatch the tasks from the server response into the store

  The biggest shift in listing 4.3 from any of the actions you’ve worked with so far is that fetchTasks returns a function,
  not an action object. The redux-thunk middleware is what makes this possible.
  If you attempted to dispatch a function without the middleware applied, Redux would throw an error because it expects an object to be passed to dispatch

  Within this dispatched function, you’re free to do the following:

    Make an AJAX request to fetch all tasks.
    Access the store state.
    Perform additional asynchronous logic.
    Dispatch a synchronous action with a result.

Most async actions tend to share these basic responsibilities.
*/

//import axios from 'axios';
/*
as your application grows you’ll start to run into a few issues. What if you change the base URL for the API from localhost:3001 to
localhost:3002? What if you want to use a different AJAX library? You have to update that code in only one place now,
but imagine if you had 10 AJAX calls. What about 100?

To address these questions, you can abstract those details into an API client and give it a friendly interface.
*/
