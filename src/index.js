import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Context from './context';


const Root = () => {
  const [facetStateValues, setFacetStateValues] = useState({});

  return (
    <React.StrictMode>
      <Router>
        <Context.Provider value={{ facetStateValues, setFacetStateValues }}>
          <App />
        </Context.Provider>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));