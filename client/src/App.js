import React, { useState } from "react";

// DEPENDENCIES
import { Route, withRouter } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import Login from "./components/Login";

// CSS
import "./styles.scss";

const loginEndPoint = "http://localhost:5000/api/login";

function App(props) {
  debugger
  const onSubmitLoginForm = (values, actions) => {
    axios
      .post(loginEndPoint, values)
      .then(res => {
        localStorage.setItem("authorization", res.data.payload);
        actions.resetForm();

      })
      .catch(error => {
        alert(error.response.data.error);
      });
  };

  return (
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
  );
}

export default withRouter(App);
