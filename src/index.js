import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './Redux/reducer';
import initalState from './Redux/initalState';


const store = createStore(reducer, initalState)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

