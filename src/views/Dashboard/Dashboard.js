import React, { Suspense, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import SearchForm from "./SearchForm";

import { motion } from "framer-motion";

import "./Dashboard.css";

function Dashboard(props) {
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);

  window.onscroll = function(ev) {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      setPage(page + 1);
    }
  };

  const getPosts = async () => {
    const existingToken = localStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?api_key"
        ? window.location.search.split("=")[1]
        : null;
    let token = accessToken || existingToken;

    const response = await fetch(process.env.REACT_APP_BURL + `posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(page)
    });

    if (response.ok) {
      const data = await response.json();
      window.history.replaceState({}, document.title, window.location.pathname);
      setRecipes([...recipes, ...data]);
    }
  };

  const replace_post = async id => {
    const response = await fetch(process.env.REACT_APP_BURL + `replace_post`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(id)
    });

    if (response.ok) {
      const data = await response.json();

      let recipesCopy = JSON.parse(JSON.stringify(recipes));

      const hasRecipeId = recipe => recipe.id === id;
      recipesCopy[recipesCopy.findIndex(hasRecipeId)] = data;
      setRecipes(recipesCopy);
    }
  };

  const likeButton = async id => {
    const recipeId = {
      recipe_id: id
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(recipeId)
    };
    const response = await fetch(process.env.REACT_APP_BURL + "like", options);
    if (response.ok) {
      const data = await response.json();
      replace_post(id);
    }
  };

  const returnSearchResults = values => {
    props.returnSearchResults(values);
  };

  const pageVariants = {
    initial: {
      // opacity: 0
      // : "-100vw"
    },
    in: {
      // opacity: 1
      // x: 0
    },
    out: {
      // opacity: 0
      // x: "100vw",
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
    duration: 1
    // scale: 0.8
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
      <div
        className="text-center"
        style={{ marginTop: "30px", marginBottom: "3.5%" }}
      >
        <SearchForm returnSearchResults={returnSearchResults} />
      </div>
      <div className="banner-container col-xs-12 col-sm-12 col-lg-12">
        <div className="col-xl-4 col-lg-4  banner-sub-container">
          <h3
            style={{
              lineHeight: "3rem",
              letterSpacing: "-.1rem"
            }}
            className="banner-header"
          >
            Discover Fresh Recipes For Summer
          </h3>
          <div
            style={{
              padding: "0px",
              fontSize: "16px",
              margin: "0px!important"
            }}
            className="col-lg-11 col-sm-8 col-11 about "
          >
            <p style={{ fontSize: "16px" }}>
              Yeeeum is a recipe application designed with busy people in mind.
              Store your own recipes and save your favorites.
            </p>
          </div>
          <div
            className="col-lg-4 button-container"
            style={{ lineHeight: "1.625" }}
          >
            <Link to={"/register"}>
              <button href="#bottom" className="join-newsletter-btn ">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="col-xs-12"></div>
      </div>
      <div
        className="col-lg-12 img-fluid banner-img"
        style={{
          backgroundImage: `url(assets/img/banner.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginTop: "5vw",
          height: "460px",
          transform: "rotateY(180deg)",
          zIndex: "-10"
        }}
      ></div>

      <div className="col-xl-10 col-lg-11 container mx-auto recipes-container ">
        <div className="col-12">
          <h3
            className="foryou"
            style={{ marginBottom: "3%", marginLeft: "-8px" }}
          >
            Recipes For You
          </h3>
        </div>

        <div className="row mx-auto">
          <RecipeCard
            recipes={recipes}
            likeButton={likeButton}
            getPosts={getPosts}
            page={page}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
