import React, { useState } from "react";
import { render } from "react-dom";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import FacebookIcon from "@material-ui/icons/Facebook";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "./Login.css";
export default function LoginForm(props) {
  let history = useHistory();
  const handleSubmit = () => {
    // localStorage.setItem("login", true);
    document.getElementById("fb-form").submit();
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
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
          password: values.password,
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
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
              variant="outlined"
              style={{
                width: "230px",
              }}
              className="mx-auto pb-3 text-center"
              type="email"
              name="email"
              component={TextField}
              placeholder="E-mail"
            />
            <EmailIcon
              style={{
                position: "absolute",
                left: 30,
                top: 8,
                color: "lightgrey",
              }}
            />
            <br></br>
            <Field
              style={{
                width: "230px",
              }}
              variant="outlined"
              type="password"
              name="password"
              component={TextField}
              placeholder="Password"
            />
            <LockIcon
              style={{
                position: "absolute",
                left: 30,
                bottom: 37,
                color: "lightgrey",
              }}
            />
            <br></br>
            <div style={{ fontSize: 10, color: "grey" }}>
              <input type="checkbox" className="mr-1 mt-3" />
              Keep Me Signed In
            </div>
          </div>
          <div className=" text-center pt-3 pb-3 ">
            <Button
              type="primary"
              htmlType="submit"
              // className="login-form-button"
              style={{
                borderRadius: "5rem",
                color: "white",
                backgroundColor: "#00a287",
                width: 230,
                height: 40,
              }}
              type="submit"
              disabled={isSubmitting}
            >
              GO!
            </Button>
            <br></br>
            <form
              id="fb-form"
              action={process.env.REACT_APP_BURL + "login/facebook"}
            >
              <div className="mx-auto">
                <Button
                  style={{
                    borderRadius: "5rem",
                    marginTop: "3%",
                    width: 230,
                  }}
                  className="btn-facebook mb-3 mx-auto text-center "
                  onClick={handleSubmit}
                  block
                >
                  <FacebookIcon className="mb-1  mx-auto" />
                  <span
                    className="login-form pl-2"
                    style={{ fontWeight: "bold" }}
                  >
                    Connect with Facebook
                  </span>
                </Button>
              </div>
            </form>
            <Link to="/reset_request" className="text-center">
              <div className="text-center mt-2">
                <span
                  className="login-form"
                  color="link"
                  style={{
                    color: "grey",
                    textDecoration: "none",
                    fontSize: "11px",
                  }}
                >
                  Forgot password
                </span>
              </div>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
