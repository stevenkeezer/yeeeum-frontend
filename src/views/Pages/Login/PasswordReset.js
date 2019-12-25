import React, { useState } from "react";
import { useParams } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";

export default function LoginForm(props) {
  let history = useHistory();
  let { token } = useParams();

  return (
    <Formik
      initialValues={{ password: "" }}
      validate={values => {
        const errors = {};

        if (!values.password) {
          errors.password = "Password Required";
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const data = {
          password: values.password,
          token: token
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(data)
        };
        const response = await fetch(
          process.env.REACT_APP_BURL + "reset_token",
          options
        );
        if (response.ok) {
          const data = await response.json();
          history.push("/login");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <Field type="password" name="confirm_password" />
          <ErrorMessage name="confirm_password" component="div" />
          <button type="submit reset-form" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
