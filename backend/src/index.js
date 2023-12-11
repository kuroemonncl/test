import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import {BrowserRouter} from 'react-router-dom';
console.log('Rendering App Entry Point');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);