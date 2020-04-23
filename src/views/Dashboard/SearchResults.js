import React, { Suspense, useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import RecipeItem from "../../components/RecipeItem/RecipeItem";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { motion } from "framer-motion";

export default function SearchResults(props) {
  const [recipes, setRecipes] = useState(props.searchResults);
  const [searching, setSearching] = useState(false);

  const returnSearchResults = (values) => {
    props.returnSearchResults(values);
  };

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  const replace_post = async (id) => {
    const response = await fetch(process.env.REACT_APP_BURL + `replace_post`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(id),
    });

    if (response.ok) {
      const data = await response.json();

      let recipesCopy = JSON.parse(JSON.stringify(props.searchResults));

      const hasRecipeId = (recipe) => recipe.id === id;
      recipesCopy[recipesCopy.findIndex(hasRecipeId)] = data;
      setRecipes(recipesCopy);
    }
  };

  const likeButton = async (id) => {
    const recipeId = {
      recipe_id: id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(recipeId),
    };
    const response = await fetch(process.env.REACT_APP_BURL + "like", options);
    if (response.ok) {
      const data = await response.json();
      replace_post(id);
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      // x: "-100vw"
    },
    in: {
      opacity: 1,
      // x: 0
    },
    out: {
      // opacity: 0
      // x: "100vw"
      // scale: 1
    },
  };

  const style = {
    position: "absolute",
    width: "100vw",
    marginLeft: "auto",
    marginRight: "auto",
  };
  const pageTransition = {
    type: "tween",
    transition: "linear",
    ease: "anticipate",
    duration: 1,
    scale: 0.8,
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
            {recipes &&
              recipes.map((recipe, index) => {
                if (recipes.length === index + 1) {
                  return (
                    <RecipeItem
                      // lastRecipeRef={lastRecipeRef}
                      recipe={recipe}
                      likeButton={likeButton}
                    />
                  );
                } else {
                  return <RecipeItem recipe={recipe} likeButton={likeButton} />;
                }
              })}
          </div>
        </main>
      </motion.div>
    </div>
  );
}
