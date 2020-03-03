import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Wizard from "../Compose/StepForm/Wizard";
import Background from "../../../assets/img/so-white.png";
import RecipeCard from "../../../components/RecipeCard/RecipeCard.js";

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
        <main
          className="main main-compose"
          style={{
            backgroundImage: `url(${Background})`,
            // backgroundSize: "100% 100%",
            // backgroundSize: "contain",
            // backgroundRepeat: "no-repeat",
            // backgroundColor: "#f6f6f6",
            height: "100vh"
          }}
        >
          <div className="row h-100 ">
            <div className="col mt-2 ">
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "7px",
                  padding: "60px"
                }}
                className="col-xl-6 col-lg-9 col-sm-10 col-md-8  mx-auto ml-2 mt-4 justify-content-center shadow"
              >
                <div className="d-flex">
                  <div className="col p-0 pb-4">
                    <h2 className="pb-1 font-demi">New recipe</h2>

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
                <div>
                  <Wizard
                    getProgress={getProgress}
                    createRecipe={createRecipe}
                    userImg={props.userImg}
                    user={props.user}
                  ></Wizard>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "transparent"
                  // borderRadius: "7px"
                }}
                className="col-xl-9 col-lg-9 col-sm-10 col-md-8  mx-auto ml-2 mb-3 justify-content-center "
              >
                <h2 className="pb-1 font-demi mt-3">Recipe Book</h2>
                <div className="row">
                  <div style={containerStyle}>
                    <RecipeCard recipes={recipes} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </Fragment>
  );
}
