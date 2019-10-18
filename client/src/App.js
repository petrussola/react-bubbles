import React, { useState } from "react";

// DEPENDENCIES
import { Route, withRouter, Redirect } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";

// HELPERS
import withAuth from "./axios/axios";

// CSS
import "./styles.scss";

const loginEndPoint = "http://localhost:5000/api/login";
const fetchColorsEndPoint = "http://localhost:5000/api/colors";

function App(props) {
  // SLICES OF STATE
  const [colorList, setColorList] = useState([]);

  // ON SUBMIT LOG IN FORM HANDLER
  const onSubmitLoginForm = (values, actions) => {
    axios
      .post(loginEndPoint, values)
      .then(res => {
        localStorage.setItem("authorization", res.data.payload);
        props.history.push("/bubbles");
        actions.resetForm();
      })
      .catch(error => {
        alert(error.response.data.error);
      });
  };

  // FETCH COLORS FROM API
  const fetchColorsApi = () => {
    withAuth()
      .get(fetchColorsEndPoint)
      .then(resp => {
        setColorList(resp.data)
      })
      .catch(error => {
        debugger
      });
  };

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={props => {
          return (
            <Login
              {...props}
              onSubmitLoginForm={onSubmitLoginForm}
            />
          );
        }}
      />
      {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      <PrivateRoute
        path="/bubbles"
        component={BubblePage}
        fetchColorsApi={fetchColorsApi}
        colorList={colorList}
        setColorList={setColorList}
      />
    </div>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("authorization") ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default withRouter(App);
