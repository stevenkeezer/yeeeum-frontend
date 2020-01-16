import React, { useState, useEffect } from "react";
import RecipeField from "./RecipeField";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Wizard from "../Compose/StepForm/Wizard";

import "./Upload.css";

export default function Upload(props) {
  return (
    <>
      <RecipeField createRecipe={props.createRecipe} />{" "}
    </>
  );
}
