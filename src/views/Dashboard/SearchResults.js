import React, { Suspense, useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { motion } from "framer-motion";

export default function SearchResults(props) {
  const returnSearchResults = values => {
    props.returnSearchResults(values);
  };

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  const pageVariants = {
    initial: {
      opacity: 0
      // x: "-100vw"
    },
    in: {
      opacity: 1
      // x: 0
    },
    out: {
      // opacity: 0
      // x: "100vw"
      // scale: 1
    }
  };

  const style = {
    position: "absolute",
    width: "100vw",
    marginLeft: "auto",
    marginRight: "auto"
  };
  const pageTransition = {
    type: "tween",
    transition: "linear",
    ease: "anticipate",
    duration: 1,
    scale: 0.8
  };

  return (
    <div>
      <motion.div
        style={style}
        exit="out"
        animate="in"
        initial="initial"
        variants={pageVariants}
        transition={pageTransition}
      >
        <main className="main">
          <div style={{ paddingTop: "30px" }} className="mb-5">
            <SearchForm returnSearchResults={returnSearchResults} />
          </div>
          <div className="row col-xl-10 mx-auto">
            <RecipeCard recipes={props.searchResults} />
          </div>
        </main>
      </motion.div>
    </div>
  );
}
