import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Wizard from "../Compose/StepForm/Wizard";
import Background from "../../../assets/img/pizza.jpeg";
import RecipeCard from "../../../components/RecipeCard/RecipeCard.js";
import Logo from "../../../assets/img/logo.png";
import "../ComingSoon/util.css";
import "../ComingSoon/ComingSoon.css";

import { AnimatePresence, motion } from "framer-motion";
import StepProgressBar from "./StepProgressBar";

import "./Compose.css";

export default function Compose(props) {
  let history = useHistory();
  const [fileAdded, setFileAdded] = useState(false);
  const [progress, setProgress] = useState(25);
  const [recipes, setRecipes] = useState([]);

  const getUserPosts = async () => {
    const response = await fetch(process.env.REACT_APP_BURL + `profile`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      setRecipes(data);
    }
  };

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  function getProgress(props) {
    const page = props.pageIndex;
    if (page === 0) {
      setProgress(0);
    }
    if (page === 1) {
      setProgress(34);
    }
    if (page === 2) {
      setProgress(67);
    }
    if (page === 3) {
      setProgress(100);
    }
  }

  const pageVariants = {
    initial: {
      // opacity: 0,
      // y: "-100vw"
    },
    in: {
      // opacity: 1,
      // y: 0
    },
    out: {
      // opacity: 0
      // x: "100vw",
      // scale: 1
    }
  };

  const style = {
    position: "absolute",
    // marginTop: "8vh",
    width: "100vw",
    marginLeft: "auto",
    marginRight: "auto"
  };

  const pageTransition = {
    type: "tween",
    transition: "linear",
    duration: 1
    // scale: 0.8
  };

  const containerStyle = {
    display: "flex",
    overflowX: "auto",
    padding: "0px"
  };

  const createPost = async data => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(data)
    };
    const resp = await fetch(
      process.env.REACT_APP_BURL + "post_recipe",
      options
    );
    if (resp.ok) {
      const data = await resp.json();
      if (data.status) {
        if (fileAdded) {
        } else {
          history.push("/upload_files");
        }
      }
    }
  };

  const createRecipe = values => {
    createPost(values);
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <Fragment>
      <motion.div
        exit="out"
        style={style}
        animate="in"
        initial="initial"
        variants={pageVariants}
        transition={pageTransition}
      >
        <main className="main">
          <div class="size1 bg0 where1-parent">
            <div
              class="flex-c-m bg-img1 size2 where1 overlay1 where2 respon2"
              style={{
                backgroundImage: `url(${Background})`
              }}
            ></div>

            <div class="size3 flex-col-sb flex-w p-l-75 p-r-75 p-t-45 p-b-45 respon1">
              <div class="wrap-pic1">
                <div className="row">
                  <img src={Logo} style={{ width: "60px" }} alt="LOGO" />
                  <h3 className="pl-1 header-title">New recipe</h3>
                </div>
              </div>

              <div
                className="ml-lg-3"
                style={{
                  // backgroundColor: "rgb(242, 242, 242)",
                  borderRadius: ".5rem",
                  minWidth: "1400px"
                  // paddingTop: "2.5vw",
                  // paddingBottom: "5vw"

                  // paddingLeft: "2.5vw"
                }}
              >
                <div className="row h-100">
                  <div className="">
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "7px",
                        maxWidth: "90%"
                      }}
                      className="shadow-lg p-md-5 p-0"
                    >
                      <div className="d-flex">
                        <div className="col p-0 pb-5 pt-1">
                          <h3 className="" style={{ fontSize: ".8rem" }}>
                            Add your recipes, and take them anywhere!
                          </h3>
                        </div>
                        <div className="col pt-3">
                          <StepProgressBar
                            progress={progress}
                            createRecipe={createRecipe}
                            backgroundColor="white"
                          />
                        </div>
                      </div>

                      <Wizard
                        getProgress={getProgress}
                        createRecipe={createRecipe}
                        userImg={props.userImg}
                        user={props.user}
                      ></Wizard>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex-w">
                <a href="#" class="flex-c-m size5 bg3 how1 trans-04 m-r-5">
                  <i class="fa fa-facebook"></i>
                </a>

                <a href="#" class="flex-c-m size5 bg4 how1 trans-04 m-r-5">
                  <i class="fa fa-twitter"></i>
                </a>

                <a href="#" class="flex-c-m size5 bg5 how1 trans-04 m-r-5">
                  <i class="fa fa-youtube-play"></i>
                </a>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </Fragment>
  );
}
