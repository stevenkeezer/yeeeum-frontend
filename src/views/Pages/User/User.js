import React, { Suspense, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import RecipeCard from "../../../components/RecipeCard/RecipeCard";
import FavRecipeCard from "./FavRecipeCard";
import { motion } from "framer-motion";
import "./User.css";

export default function User(props) {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  let { id } = useParams();

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  const getUserRecipes = async () => {
    const response = await fetch(process.env.REACT_APP_BURL + `user/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      getFavPosts();
      setRecipes(data[0]);
      setUser(data[1]);
    }
  };

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
    getUserRecipes();
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
    duration: 0.8,
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
          {recipes.length > 0 ? (
            <>
              <div className="col-8 col-lg-9 mx-auto pt-5">
                <div className="row">
                  {user && user.fbId && !user.img_url && (
                    <img
                      width="80px"
                      alt=""
                      className="rounded-circle"
                      src={`https://graph.facebook.com/${props.fbId}/picture?width=100&height=100`}
                    ></img>
                  )}

                  {user && user.img_url && (
                    <img
                      width="80px"
                      alt=""
                      className="rounded-circle"
                      src={`https://yeeeum.s3-us-west-1.amazonaws.com/${props.userImg}`}
                    ></img>
                  )}

                  {user && !user.img_url && !user.fbId && (
                    <img
                      alt=""
                      className="rounded-circle"
                      src={"/assets/img/default.png"}
                      width="60px"
                    ></img>
                  )}
                  <h3 className="pb-3 user-font ml-3 ">
                    {user && user.name}'s Recipe Book ({recipes.length})
                  </h3>
                </div>
                <div className="row mt-5">
                  <RecipeCard
                    likeButton={likeButton}
                    setRecipes={setRecipes}
                    recipes={recipes}
                    getFavPosts={getFavPosts}
                    getUserRecipes={getUserRecipes}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center align-content-center">
              <CircularProgress
                style={{ marginTop: "13%", color: "#00a287" }}
              />
            </div>
          )}

          {favorites.length > 0 ? (
            <>
              <div className="col-8 col-lg-9 mx-auto">
                <h3 className="pb-3 user-font">
                  Favorites ({favorites.length})
                </h3>
                <div className="row">
                  <FavRecipeCard
                    likeButton={likeButton}
                    recipes={recipes}
                    favorites={favorites}
                    getFavPosts={getFavPosts}
                    getUserRecipes={getUserRecipes}
                    setFavorites={setFavorites}
                    setUser={setUser}
                  />
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </main>
      </motion.div>
    </div>
  );
}
