import React, { useEffect } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link } from "react-router-dom";
import { Button, Container, Form, Row } from "reactstrap";
import LoginForm from "./LoginForm.js";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import "./Login.css";

function Login(props) {
  console.log("Login Page");
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // history.push("/");
    }
  }, []);

  const handleSubmit = () => {
    // localStorage.setItem("login", true);
    document.getElementById("fb-form").submit();
  };

  const pageVariants = {
    initial: {
      // opacity: 0,
      // x: "-100vw"
    },
    in: {
      // opacity: 1,
      // x: 0
    },
    out: {
      // opacity: 0,
      // x: "100vw"
      // scale: 1
    }
  };

  const style = {
    position: "absolute",
    width: "100vw"
  };
  const pageTransition = {
    type: "tween",
    transition: "linear",
    ease: "anticipate",
    duration: 0.3,
    scale: 0.8
  };
  return (
    <motion.div
      style={style}
      exit="out"
      animate="in"
      initial="initial"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="app flex-row align-items-center">
        <Container>
          <h3
            className="text-center"
            style={{
              marginTop: "-50px",
              marginBottom: "50px",
              color: "#ff4e00"
            }}
          >
            <img width="100px" src="assets/img/logo.png"></img>
          </h3>
          <Row className="justify-content-center">
            <Form>
              <h1
                className="login-header"
                style={{
                  textAlign: "center",
                  fontWeight: "300"
                }}
              >
                Your recipes. Your way.
              </h1>
              <p
                className="text-muted mx-auto login-form"
                style={{
                  color: "grey",
                  textAlign: "center",
                  fontSize: "1.2rem"
                }}
              >
                Delicious recipes are just a click away.
              </p>
              <form
                id="fb-form"
                action={process.env.REACT_APP_BURL + "login/facebook"}
              >
                <div className="col-10 mx-auto ">
                  <Button
                    style={{
                      borderRadius: "5rem",
                      marginTop: "7%",
                      width: "80%"
                    }}
                    className="btn-facebook mb-4 mx-auto text-center "
                    onClick={handleSubmit}
                    block
                  >
                    <FacebookIcon className="mb-1 mr-2 mx-auto" />
                    <span className="login-form" style={{ fontWeight: "bold" }}>
                      Connect with Facebook
                    </span>
                  </Button>
                </div>
              </form>
              <LoginForm props={props} />
              {/* <Link to="/register">
                <button
                  className="btn btn-secondary login-form sign-up-btn"
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
              </Link> */}
              <div className="text-center login-form mb-2">
                <Link to="/register">Sign up</Link> to get delcious recipes.
              </div>
              <div className="text-center login-form mt-1">
                By connecting, you agree to our <a href="/">Terms of Use</a> and{" "}
                <a href="/">Privacy Notice</a>
              </div>
            </Form>
          </Row>
        </Container>
      </div>
    </motion.div>
  );
}

export default Login;
