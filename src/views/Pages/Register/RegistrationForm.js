import React, { useState } from "react";
import { render } from "react-dom";
import * as Yup from "yup";
import { DisplayFormikState } from "./Helper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { TextField } from "formik-material-ui";
import { Button } from "reactstrap";
import "./Register.css";

export default function EmailForm() {
  const [error, setError] = useState(false);
  let history = useHistory();

  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Password Required";
        }
        if (!values.username) {
          errors.username = "Username Required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const data = {
          username: values.username,
          email: values.email,
          password: values.password
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
          process.env.REACT_APP_BURL + "register",
          options
        );
        if (response.ok) {
          const data = await response.json();

          if (data.status) {
            history.push("/");
          } else {
            setError(true);
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form
          style={{ padding: "0px!important" }}
          className="flex-column mx-auto"
        >
          <Field
            style={{ width: "210px" }}
            type="username"
            name="username"
            placeholder="Username"
            component={TextField}
          />
          <br></br>
          <Field
            style={{ width: "210px" }}
            className="mt-3"
            type="email"
            name="email"
            placeholder="Email"
            component={TextField}
          />
          <br></br>
          <Field
            style={{ width: "210px" }}
            className="mt-3"
            type="password"
            name="password"
            placeholder="Password"
            component={TextField}
          />
          <br></br>
          <Button
            className="register-form mt-4 mx-auto"
            style={{
              width: "180px",
              border: "none",
              backgroundColor: "#00a287",
              color: "white",
              borderRadius: "5rem",
              padding: ".6rem .3rem"
            }}
            type="submit"
            disabled={isSubmitting}
            block
          >
            Create Account
          </Button>

          {error && (
            <div className="text-center register-form">
              Email already exists.
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
