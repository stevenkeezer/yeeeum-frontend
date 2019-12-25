import React, { useState } from "react";
import { render } from "react-dom";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "./Login.css";
export default function LoginForm(props) {
  let history = useHistory();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
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

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        localStorage.setItem("login", true);
        const data = {
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
          process.env.REACT_APP_BURL + "login",
          options
        );
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          props.props.setUserId(data.user_id);
          props.props.setUser(data.username);
          props.props.setUserImg(data.img_url);
          props.props.setFbId(data.fb_img_id);
          props.props.getUserInfo();
          history.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form id="lg-form">
          <div className="col text-center">
            <Field
              style={{
                width: "230px"
              }}
              className="mx-auto pb-3"
              type="email"
              name="email"
              component={TextField}
              placeholder="Email"
            />
            <br></br>
            <Field
              style={{
                width: "230px"
              }}
              type="password"
              name="password"
              component={TextField}
              placeholder="Password"
            />
            <br></br>
          </div>
          <div className=" col-10 mx-auto pt-3 pl-4 pb-3 ">
            <Link to="/reset_request">
              <span
                className="login-form"
                color="link"
                style={{
                  color: "grey",
                  textDecoration: "none",
                  fontSize: "12px",
                  marginLeft: "32px",
                  paddingRight: "50px"
                }}
              >
                Forgot password?
              </span>
            </Link>
            <button
              style={{
                color: "white",
                padding: ".5rem 1.5rem",
                borderRadius: "5rem",
                outline: "none",
                backgroundColor: "#00a287"
              }}
              className="mr-auto login-form"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
