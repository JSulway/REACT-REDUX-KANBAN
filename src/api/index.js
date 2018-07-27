import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';      // Defines a constant for the API’s base URL

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',            // The Content-Type header is required by json-server for PUT requests
  },
});

export function fetchTasks() {                     // GET - Retrieve information. // Exports a named fetchTasks function that will make the call
  return client.get('/tasks');
}

export function createTask(params) {  // POST - Request that the resource at the URI do something with the provided entity
  return client.post('/tasks', params);       // A POST request is required to add or update data on the server
}

export function editTask(id, params) {  // PUT - Store an entity at a URI
  // Uses an ES2015 template string to easily construct the URL
  return client.put(`${API_BASE_URL}/tasks/${id}`, params);       // A POST request is required to add or update data on the server
}

export function removeTask(task){ // DELETE - Request that a resource be removed
  return client.delete(`${API_BASE_URL}/tasks/${task.id}`);
}

/*
Here you’re hardcoding the base URL for the API. In a real-world application, you’d likely get this from a server,
so the value can be different based on the environment, like staging or production.

With fetchTasks, you’re encapsulating the request method as well as the URL for the endpoint.
If either change, you only have to update code in one place. Note that axios.get returns a promise, which you
can call .then and .catch on from within an async action creator.
*/


/* 4.3
Next high-level steps:

    Convert the synchronous createTask action creator into an async action creator.
    Add a new method to your API client, which will send a POST request to the server.
    Create a new server action, CREATE_TASK_SUCCEEDED, whose payload will be a single task object.
    In the createTask action creator, initiate the request, and dispatch CREATE_TASK_SUCCEEDED when the request finishes. For now, you can assume it will always be successful.
*/
