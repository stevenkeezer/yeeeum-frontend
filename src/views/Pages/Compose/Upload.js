import React, { useState, useEffect } from "react";
import RecipeField from "./RecipeField";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import "./Upload.css";

export default function Upload() {
  let history = useHistory();
  const [fileAdded, setFileAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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
    <div
      style={{ marginLeft: "0px!important" }}
      className="mx-auto col-lg-10 pt-5"
    >
      <RecipeField createRecipe={createRecipe} />
    </div>
  );
}
