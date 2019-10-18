import React, { useState } from "react";

// DEPENDENCIES
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import Login from "./components/Login";

// CSS
import "./styles.scss";

const loginEndPoint = "http://localhost:5000/api/login";

function App() {
  const onSubmitLoginForm = (values, actions) => {
    axios
      .post(loginEndPoint, values)
      .then(res => {
        localStorage.setItem('authorization', res.data.payload)
        debugger;
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  };

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
