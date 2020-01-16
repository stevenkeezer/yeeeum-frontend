import React, { Component } from "react";
import EmailForm from "./RegistrationForm";
import FacebookIcon from "@material-ui/icons/Facebook";
import Timer from "react-compound-timer";
import { motion } from "framer-motion";

// import pizzabcg from "../../../../public/assets/img/pizzabcg.jpg";
import { Button, Card, CardFooter, div, Row } from "reactstrap";
import "./Register.css";

function Register() {
  const handleSubmit = () => {
    localStorage.setItem("login", true);
    document.getElementById("fb-form").submit();
  };

  const pageVariants = {
    initial: {
      // opacity: 0
      // x: "-100vw"
    },
    in: {
      // opacity: 1
      // x: 0
    },
    out: {
      // opacity: 0
      // x: "100vw"
      // scale: 1
    }
  };

  const style = {
    // position: "absolute"
  };
  const pageTransition = {
    type: "tween",
    transition: "linear",
    ease: "anticipate",
    duration: 0.8,
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
      <img
        style={{ position: "absolute", left: "5%", zIndex: "10" }}
        width="90px"
        src="assets/img/logo.png"
        className="logo"
      ></img>
      <div
        className="app flex-row align-items-center"
        // style={{
        //   // backgroundImage: `url(assets/img/pizzabcg.jpg)`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "top right",
        //   width: "100vw",
        //   backgroundColor: "#fbfbfb",
        //   transform: "rotateY(180deg)",
        //   backgroundRepeat: "no-repeat"
        // }}
      >
        <div
          className="col-lg-6 mx-auto register-card text-center"
          // style={{ marginLeft: "0px!important", transform: "rotateY(180deg)" }}
        >
          <div className="row mx-auto">
            <div className="col-lg-12 order-lg-first">
              <Card
                style={{
                  border: "none",
                  margin: "1rem 1rem",
                  borderRadius: ".5rem",
                  maxWidth: "400px"
                }}
                className="mx-4 card-bcg mx-auto"
              >
                <h1 className="text-center register-header">Join For Free</h1>
                <p className="text-muted text-center register-form">
                  Create your account
                </p>

                <EmailForm />

                <CardFooter
                  className="mx-auto"
                  style={{ background: "transparent", border: "none" }}
                >
                  <Row>
                    <form
                      id="fb-form"
                      action={process.env.REACT_APP_BURL + "login/facebook"}
                    >
                      <Button
                        style={{
                          borderRadius: "5rem"
                        }}
                        className="btn-facebook register-form mb-4 mx-auto "
                        onClick={() => handleSubmit()}
                        block
                      >
                        <FacebookIcon className="mb-1 mr-2 mx-auto " />
                        <span
                          className="register-form mx-auto"
                          style={{ fontWeight: "bold", fontSize: "12px" }}
                        >
                          Connect with Facebook
                        </span>
                      </Button>
                    </form>
                  </Row>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
