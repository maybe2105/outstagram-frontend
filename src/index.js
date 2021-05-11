import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirebaseContext from './context/firebase';
import { FieldValue, firebase } from './context/firebase';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
