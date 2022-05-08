import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './Redux/reducer';
import { initalState } from './Redux/initalState';
import { BrowserRouter } from 'react-router-dom'

import { save, load } from "redux-localstorage-simple"




const store = createStore(reducer, initalState)



ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />

      </BrowserRouter>
    </React.StrictMode>
  </Provider >,
  document.getElementById('root')
);

