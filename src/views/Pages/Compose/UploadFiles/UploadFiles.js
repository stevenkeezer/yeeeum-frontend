import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import Facebook from "@uppy/facebook";
import Webcam from "@uppy/webcam";
import { Dashboard } from "@uppy/react";
import { motion } from "framer-motion";
import "@uppy/dashboard/dist/style.css";
import "@uppy/core/dist/style.css";
import "../Compose.css";

export default function Upload() {
  let history = useHistory();
  const [fileAdded, setFileAdded] = useState(false);

  const uppyRef = React.useRef();

  if (!uppyRef.current) {
    uppyRef.current = Uppy({
      autoProceed: false,
      bundle: false,
      restrictions: {
        maxFileSize: 1000000,
        maxNumberOfFiles: 6,
        minNumberOfFiles: 1,
        allowedFileTypes: ["image/*", "video/*"],
        dimensions: { width: 1200, height: 800 }
      }
    })
      .use(XHRUpload, {
        endpoint: process.env.REACT_APP_BURL + `add_recipe_image`,
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .use(Webcam, {})
      .use(Facebook, {
        companionUrl: "https://companion.uppy.io"
      })

      .on("file-added", file => {
        setFileAdded(true);
      })
      .on("file-removed", file => {
        setFileAdded(false);
      })
      .on("complete", result => {})
      .on("upload-success", (file, response) => {
        if (response.status === 200) {
          history.push(`/recipe/${response.body[1]}`);
        }
      });
  }

  const options = {
    inline: true
  };

  const submitUppy = values => {
    uppyRef.current.upload();
  };
  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vh"
    },
    in: {
      opacity: 1,
      x: 0
    },
    out: {
      opacity: 0
      // x: "100vh",
      // scale: 1
    }
  };

  const style = {
    position: "absolute",
    width: "100%"
  };

  const pageTransition = {
    type: "tween",
    transition: "linear",
    ease: "anticipate",
    duration: 1,
    scale: 0.8
  };
  return (
    <main
      className="main vh-100"
      style={{ backgroundImage: "linear-gradient(#f6f6f6, #ffffff)" }}
    >
      <div className=" vh-100 mx-auto justify-content-center d-flex align-items-center col-lg-8">
        <motion.div
          style={style}
          exit="out"
          animate="in"
          initial="initial"
          variants={pageVariants}
          transition={pageTransition}
        >
          <h3>Add Images</h3>
          <div className="shadow">
            <Dashboard
              uppy={uppyRef.current}
              width="100%"
              plugins={["Webcam"]}
              metaFields={[
                { id: "name", name: "Name", placeholder: "File name" }
              ]}
              {...options}
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
