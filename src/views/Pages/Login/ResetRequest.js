import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "reactstrap";
import "./ResetRequest.css";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetRequest(props) {
  const [emailSent, setEmailSent] = useState(false);
  return (
    <div className="animated fadeIn">
      <Link to="/register" className="d-flex justify-content-right">
        <button
          className="btn btn-secondary login-form"
          style={{
            fontFamily: "AvenirNextLTProRegular",
            position: "absolute",
            padding: "10.8px 32px",
            top: "27px",
            right: "7.5%",
            borderRadius: "5rem",
            backgroundColor: "white",
            fontSize: "13px",
            fontWeight: "700",
            color: "#00a287",
            border: "1.5px solid #00a287"
          }}
          active
          tabIndex={-1}
        >
          Sign Up
        </button>
      </Link>

      <Link to="/" className="d-flex justify-content-right">
        <img
          className="logo-reset"
          width="100px"
          src="assets/img/logo.png"
        ></img>
      </Link>

      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Form>
              <h1
                style={{ color: "black!important" }}
                className=" text-center reset-form-header"
              >
                Reset Password
              </h1>
              {!emailSent ? (
                <p className="col-8 mx-auto text-center reset-form">
                  Enter your Yeeeum email address you used to sign up. We will
                  email you with your username and a link to reset your
                  password.
                </p>
              ) : (
                <p className="reset-form">
                  An email has been sent to reset your password
                </p>
              )}
              <Col className="text-center">
                <ResetPasswordForm
                  setEmailSent={setEmailSent}
                  emailSent={emailSent}
                />
              </Col>
            </Form>
          </Row>
        </Container>
      </div>
    </div>
  );
}
