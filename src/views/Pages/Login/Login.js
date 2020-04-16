import React, { useEffect } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link } from "react-router-dom";
import { Button, Container, Form, Row, Label, Input } from "reactstrap";
import LoginForm from "./LoginForm.js";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../../assets/hearts.json";

import "./Login.css";

function Login(props) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <main className="main">
      <div className="login-page">
        <Lottie
          options={options}
          style={{ position: "absolute", top: 10 }}
          height={175}
          width={175}
          isStopped={false}
          isPaused={false}
        />
        <div className="login-box p-5">
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p className="form-title text-center pb-4">Sign In</p>

            <LoginForm props={props} />
          </Form>
        </div>
      </div>
    </main>
  );
}

export default Login;
