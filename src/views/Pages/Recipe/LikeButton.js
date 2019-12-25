import React, { useState, Fragment, useEffect } from "react";
import "../../../components/RecipeCard/RecipeCard.css";
import LikeRotator from "../../../components/LikeRotator/LikeRotator";

export default function RecipeCard(props) {
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

  const getLikes = async () => {
    const response = await fetch(process.env.REACT_APP_BURL + `get_likes`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });

    if (response.ok) {
      const data = await response.json();
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
      props.setRecipe(data);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <>
      {props.recipes && (
        <>
          <div className="product-div">
            <figure className="card">
              <figcaption className="info-wrap">
                <div className="row">
                  <div
                    style={{
                      paddingLeft: "0!important",
                      paddingRight: "0!important"
                    }}
                  ></div>

                  <div onClick={() => likeButton(props.recipes.id)}>
                    <LikeRotator
                      isLiked={props.recipes.isLiked}
                      likes={props.recipes.like}
                    />
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </>
      )}
    </>
  );
}
