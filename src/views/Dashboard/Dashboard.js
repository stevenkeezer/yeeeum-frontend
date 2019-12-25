import React, { Suspense, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import SearchForm from "./SearchForm";

import "./Dashboard.css";

function Dashboard(props) {
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  window.onscroll = function(ev) {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      setPage(page + 1);
    }
  };

  const getPosts = async () => {
    const myToken = await localStorage.getItem("token");
    const response = await fetch(process.env.REACT_APP_BURL + `posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(page)
    });

    if (response.ok) {
      const data = await response.json();
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

  useEffect(() => {
    setPage(1);
  }, []);

  const returnSearchResults = values => {
    props.returnSearchResults(values);
  };

  return (
    <Fragment>
      <div className="animated fadeIn">
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
                Yeeeum is a recipe application designed with busy people in
                mind. Store your own recipes and save your favorites.
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
            backgroundSize: "contain",
            marginTop: "5vw",
            width: "100vw",
            height: "460px",
            transform: "rotateY(180deg)",
            zIndex: "-10"
          }}
        ></div>

        <div className="col-lg-10 container mx-auto recipes-container ">
          <div className="col-12">
            <h3
              className="foryou"
              style={{ marginBottom: "3%", marginLeft: "-8px" }}
            >
              Recipes For You
            </h3>
          </div>
          <Suspense fallback={loading()}>
            <div className="row mx-auto">
              <RecipeCard
                recipes={recipes}
                likeButton={likeButton}
                getPosts={getPosts}
                page={page}
              />
            </div>
          </Suspense>
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
