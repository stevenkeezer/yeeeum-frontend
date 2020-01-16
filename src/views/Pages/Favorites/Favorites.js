import React, { Suspense, useEffect, useState } from "react";
import { AppHeader, AppSidebar, AppSidebarHeader } from "@coreui/react";
import CircularProgress from "@material-ui/core/CircularProgress";
import RecipeCard from "../../../components/RecipeCard/RecipeCard";
import { motion } from "framer-motion";
import "./Favorites.css";

export default function Favorites(props) {
  const [favorites, setFavorites] = useState([]);
  const [hideSpinner, setHideSpinner] = useState(true);

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  const getFavPosts = async () => {
    const response = await fetch(process.env.REACT_APP_BURL + `favorites`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      setFavorites(data);
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

      let recipesCopy = JSON.parse(JSON.stringify(favorites));

      const hasRecipeId = recipe => recipe.id === id;
      recipesCopy[recipesCopy.findIndex(hasRecipeId)] = data;
      setFavorites(recipesCopy);
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
    getFavPosts();
  }, []);

  const pageVariants = {
    initial: {
      // opacity: 0
      // x: "-100vw"
    },
    in: {
      // opacity: 1
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
    // duration: 2,
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
          {favorites.length > 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "100%",
                imageRendering: "high-quality",
                textAlign: "center",
                verticalAlign: "center",
                height: "240px",
                backgroundColor: "white",
                backgroundImage: `url(https://yeeeum.s3-us-west-1.amazonaws.com/${
                  favorites[Math.floor(Math.random() * favorites.length)]
                    .images[0].img_url
                }`,
                backgroundSize: "cover",
                backgroundPosition: "top right",
                backgroundRepeat: "no-repeat",
                color: "white"
              }}
            >
              <span>
                All <br></br> 4 Recipes <br></br>Collected.
              </span>
            </div>
          ) : (
            <div></div>
          )}
          <div className="col-11 col-xl-9 col-lg-10 mx-auto pt-4">
            <div className="row mt-5">
              {favorites.length < 0 && (
                <div className="d-flex mx-auto">
                  <div className="d-flex justify-content-center">
                    {hideSpinner ? (
                      <CircularProgress
                        style={{ marginTop: "103%", color: "#00a287" }}
                      />
                    ) : (
                      <h3 className="favorites-font">
                        You got no recipes yet.
                      </h3>
                    )}
                  </div>
                </div>
              )}
              <RecipeCard
                className="mx-auto"
                recipes={favorites}
                likeButton={likeButton}
                setFavorites={setFavorites}
                getFavPosts={getFavPosts}
              />
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
}
