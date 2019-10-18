import React from "react";
import { Formik, Form, Field } from 'formik';

const loginFormInitialValues = {
  username: null,
  password: null,
}

const Login = ({onSubmitLoginForm}) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <Formik 
        initialValues={loginFormInitialValues}
        onSubmit={onSubmitLoginForm}
        render={props => {
          return (
            <Form>
              <label>
                Username:
                <Field name='username' type='text' />
              </label>
              <label>
                Password:
                <Field name='password' type='password' />
              </label>
              <button type='submit'>Login</button>
            </Form>
          )
        }}
      />
    </>
  );
};

export default Login;
