import React, { useState } from "react";

// DEPENDENCIES
import { Route, withRouter, Redirect } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import Login from "./components/Login";
import BubblePage from './components/BubblePage';

// CSS
import "./styles.scss";

const loginEndPoint = "http://localhost:5000/api/login";

function App(props) {
  const onSubmitLoginForm = (values, actions) => {
    axios
      .post(loginEndPoint, values)
      .then(res => {
        localStorage.setItem("authorization", res.data.payload);
        props.history.push('/bubbles')
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
        <PrivateRoute path='/bubbles' component={BubblePage} />
      </div>
  );
}

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest}
    render={props => 
    localStorage.getItem('authorization') ? (
      <Component {...props} />
    ) : (
      <Redirect to='/'/>
    )}
     />
  )
}

export default withRouter(App);
