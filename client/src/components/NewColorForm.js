import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import withAuth from "../axios/axios";
import axios from "axios";

const newColorFormInitialValue = {
  color: "",
  code: ""
};

const colorsEndPoint = "http://localhost:5000/api/colors";

export default function NewColorForm({updateColors}) {
  const onSubmitForm = values => {
    debugger;
    withAuth()
      .post(colorsEndPoint, {
        color: values.color,
        code: {
          hex: values.hex
        }
      })
      .then(res => {
        debugger;
        updateColors(res.data)
      })
      .catch(error => {
        debugger;
      });
  };

  return (
    <Formik
      initialValues={newColorFormInitialValue}
      onSubmit={onSubmitForm}
      render={({ values }) => {
        return (
          <Form>
            Add your own color!
            <label>
              color
              <Field name="color" type="text" />
            </label>
            <label>
              code
              <Field name="hex" type="text" />
            </label>
            <button type="submit">Add color</button>
          </Form>
        );
      }}
    />
  );
}
