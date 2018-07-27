export default function tasks(state = { tasks: [] }, action) {
  switch (action.type) {
      case 'FETCH_TASKS_SUCCEEDED': {  // >>>> The reducer now listens for the server action.
        return { tasks: action.payload.tasks, };
      }
      case 'CREATE_TASK_SUCCEEDED': {          // Shows the new action handler
          return { tasks: state.tasks.concat(action.payload.task), };
      }
      case 'EDIT_TASK_SUCCEEDED': {     //Because json-server requires a full object to be passed along for PUT requests,
        const { payload } = action;       //you must grab the task out of the store and merge in the new properties yourself
        return {
          tasks: state.tasks.map(task => {
            if (task.id === payload.task.id) {          // Replaces the old task with the updated one
              return payload.task;
            }
            return task;
          }),
        };
      }
      case 'REMOVE_TASK_SUCCEEDED': {
        return { tasks: state.tasks.filter(task => task.id !== action.payload.id) }; // filters out the removed task
      }
      default: {
        return state;// Always fall back to returning the given state in case a reducer receives an action it can’t handle;
      }
  }
}

/// REMOVE to instead use ASYNC REDUX_THUNK - import { uniqueId } from '../actions';    //Imports the uniqueId function you created in src/actions/index.js

// This is the reducer

// The mock tasks for the time being
/// REMOVE to instead use ASYNC REDUX_THUNK
/*const mockTasks = [
  {
    id: uniqueId(),             // Uses uniqueId instead of hard-coded IDs
    title: 'Learn Redux',
    description: 'The store, actions, and reducers, oh my!',
    status: 'In Progress',
  },
  {
    id: uniqueId(),
    title: 'Peace on Earth',
    description: 'No big deal.',
    status: 'Unstarted',
  },
  {
    id: uniqueId(),
    title: 'Walk on water',
    description: 'wait for it to rain then walk',
    status: 'Unstarted',
  },
  {
    id: uniqueId(),
    title: 'Eat lots',
    description: 'Get lots of food, chew, swallow... repeat',
    status: 'Complete',
  },
  {
    id: uniqueId(),
    title: 'Plant a tree',
    description: 'Dig a hole and plant a tree',
    status: 'Completed',
  },
  {
    id: uniqueId(),
    title: 'Find your Keys',
    description: 'Empty all the Draws',
    status: 'Completed',
  },
];*/

/*
When the app loads, dispatch an async action, fetchTasks, to fetch the initial tasks.
Make the AJAX call to /tasks.
When the request completes, dispatch a synchronous action, FETCH_TASKS_SUCCEEDED, with the result.
*/

// A reducer with an initial state defined as the mock tasks
// Reducers are functions that accept the store’s current state and an action and return the next state after applying any relevant updates
// just returning the statwe is valid but not particularly useful
// /// REMOVE to instead use ASYNC REDUX_THUNK - replaced with [] empty array as initial state for taks property
// an empty array as the initial state for tasks.


/*
The store’s role is to manage application state; it’s where the data lives,
it controls access, and it allows components to listen for updates.
What it doesn’t, and can’t, do is define how exactly its state should change in response to actions.
That’s up to you to define, and reducers are the mechanism Redux provides to accomplish this.

Summary of React/Redux flow
You started by CREATING A STORE, PASSING in the tasks REDUCER as an argument.  (within main index.js)
After being CONNECTED to the STORE, the VIEWS RENDERED the default STATE SPECIFIED BY by the tasks REDUCER. (within App.js)
When a user wants to create a new task, the CONNECTED COMPONENT DISPATCHES an ACTION CREATOR. (App.js)
That ACTION CREATOR RETURNS an ACTION containing a CREATE_TASK type and additional data. (within ations/index.js)
Finally, the REDUCER LISTENS for the CREATE_TASK action type AND DETERMINES what the NEXT APPLICATION STATE should look like. (within reducers/index.js)

The use of asynchronous actions and redux-thunk. The redux-thunk package allows you to dispatch functions instead of objects, and inside those functions you can make network requests and dispatch additional actions when any requests complete.
The role of synchronous actions. Dispatching an action object with a type and payload is considered a synchronous action, because the store receives and processes the action immediately after dispatch.
Users and servers are the two actors that can modify state in your applications. As a result, you can group actions into view actions and server actions.
*/

// case 'CREATE_TASK': {                                 // Checks whether the action type is one that you care about
//   return { tasks: state.tasks.concat(action.payload) };              // If the action is CREATE_TASK, add the task to the array and return the result.
// }
// case 'EDIT_TASK': {                       // Checks whether the action passed in has a type that you want to handle
//   const { payload } = action;
//   return {
//     tasks: state.tasks.map(task => {                          // Because the list of tasks is stored as an array, to update the right task iterate over the
//         if (task.id === payload.id) {                                                   // list of tasks with map, and if the current task matches the ID from the payload, update it with the new params.
//           return Object.assign({}, task, payload.params);        // Uses Object.assign to update the task object by returning a new copy, not modifying the original object
//         }
//         return task;
//     })
//   }
// }

// Added remove functionality so a task can be removed from the board.
// case 'REMOVE_TASK': {
//   return { tasks: state.tasks.filter(task => task.id != action.payload.id) };
// }
