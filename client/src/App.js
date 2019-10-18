import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";

function App() {

  const onSubmitLoginForm = values => {
    debugger
  }
  
  return (
    <Router>
      <div className="App">
        <Route
          exact
          path="/"
          render={props => {
            return <Login {...props} onSubmitLoginForm={onSubmitLoginForm} />;
          }}
        />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
