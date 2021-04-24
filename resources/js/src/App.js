import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Layout from "./hoc/Layout/Layout";
import {BrowserRouter} from "react-router-dom";

const App = () => (
  <BrowserRouter>
      <Layout />
  </BrowserRouter>
);

export default App;

if (document.getElementById('root')) {
   ReactDOM.render(<App />, document.getElementById('root'));
}
