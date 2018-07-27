import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware  } from 'redux'     // Imports the createStore function from the redux package
                          // >>>> import applyMiddleware from redux
import thunk from 'redux-thunk';
                          // >>>> and import thunk from redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';
                          // >>>> devToolsEnhancer function will no longer do the trick. You’ll import another
                                  // method from the same DevTools library that can accommodate middleware, called composeWithDevTools

import tasks from './reducers'          // Because you need at least one reducer to create a Redux store, import the tasks reducer


import { Provider } from 'react-redux'; // A React component that you’ll render at the top of the React app.
                                        // Any components rendered as children of Provider can be granted access to the Redux store.


const store = createStore(tasks, composeWithDevTools(applyMiddleware(thunk)));  // Creates the Redux store by passing the reducer to createStore
                          // >>>> applyMiddleware(thunk) applies middleware during creation

//Provider is now our most top-level React component. It works in conjunction with connect to make the store available to any child component
// (connect — A function used as a bridge between React components and data from the Redux store) Behind the scenes, Provider ensures you can
// use connect to pass data from the store to one or more React components
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
