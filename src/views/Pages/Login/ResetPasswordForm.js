import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { TextField } from "formik-material-ui";
import "./PasswordReset.css";

export default function LoginForm(props) {
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const data = {
          email: values.email,
          path: "www.google.com"
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(data)
        };
        props.setEmailSent(true);
        const response = await fetch(
          process.env.REACT_APP_BURL + "reset_password",
          options
        );
        if (response.ok) {
          const data = await response.json();
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            style={{ width: "280px" }}
            type="email"
            name="email"
            className="reset-email"
            component={TextField}
            placeholder="Enter your email"
          />
          <br></br>

          {props.emailSent ? (
            <button
              type="submit"
              className="mt-4 btn btn-secondary"
              disabled={isSubmitting}
            >
              Send Again
            </button>
          ) : (
            <button
              style={{
                padding: ".5rem 1.9rem",
                fontFamily: "AvenirNextLTProRegular",
                backgroundColor: "#00a287",
                color: "white",
                borderRadius: "5rem"
              }}
              type="submit"
              className="mt-4 btn btn-secondary"
              disabled={isSubmitting}
            >
              Submit
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
}
