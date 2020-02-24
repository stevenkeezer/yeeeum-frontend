import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import Wizard from "../Compose/StepForm/Wizard";
import Background from "../../../assets/img/so-white.png";

import { AnimatePresence, motion } from "framer-motion";
import StepProgressBar from "./StepProgressBar";

import "./Compose.css";

export default function Compose(props) {
  let history = useHistory();
  const [fileAdded, setFileAdded] = useState(false);
  const [progress, setProgress] = useState(25);

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
          <div className="row  h-100 ">
            <div className="col-12 mx-auto my-auto justify-content-center">
              {" "}
            </div>

            <div className="col-xl-7 col-lg-9 col-sm-10 col-md-8 mx-auto justify-content-center">
              <StepProgressBar
                progress={progress}
                createRecipe={createRecipe}
              />
              <div>
                <br></br>
                <Wizard
                  getProgress={getProgress}
                  createRecipe={createRecipe}
                  userImg={props.userImg}
                  user={props.user}
                ></Wizard>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </Fragment>
  );
}
