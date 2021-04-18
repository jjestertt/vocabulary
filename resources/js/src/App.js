import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Layout from "./hoc/Layout/Layout";

const App = () => <Layout />

export default App;

if (document.getElementById('root')) {
   ReactDOM.render(<App />, document.getElementById('root'));
}
