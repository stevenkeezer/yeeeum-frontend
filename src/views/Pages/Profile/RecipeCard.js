import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../components/RecipeCard/RecipeCard.css";
import ContentLoader from "react-content-loader";
import Img from "react-image";
import LikeRotator from "../../../components/LikeRotator/LikeRotator";
import Truncate from "react-truncate";

export default function RecipeCard(props) {
  const [imgLoaded, setImgLoaded] = useState(false);

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

      let recipesCopy = JSON.parse(JSON.stringify(props.recipes));

      const hasRecipeId = recipe => recipe.id === id;
      recipesCopy[recipesCopy.findIndex(hasRecipeId)] = data;
      props.setRecipes(recipesCopy);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <>
      {props.recipes &&
        props.recipes.map(r => {
          return (
            <>
              {!r.deleted && (
                <div className="col-lg-4 col-xl-3 col-md-6 product-div pb-4 pl-2 pr-2">
                  <figure className="card">
                    <div className="img-wrap">
                      {imgLoaded && (
                        <>
                          {/* <button
                    style={{
                      position: "absolute",
                      zIndex: "200",
                      borderRadius: "5rem",
                      marginTop: "3.5%",
                      marginLeft: "1.5rem",
                      fontSize: "1.05rem"
                    }}
                  >
                    Trout Recipes
                  </button> */}
                        </>
                      )}

                      <Link to={`/recipe/${r.id}`}>
                        <div
                          class="image-container caption"
                          style={{
                            width: "100%",
                            paddingBottom: "90.78082192%"
                          }}
                        >
                          <Img
                            style={{
                              position: "relative",
                              borderRadius: ".4rem",
                              minWidth: "100%",
                              width: "100%"
                              // minHeight: "250px"
                            }}
                            width="100%"
                            className="img-responsive transition"
                            src={
                              r.images.length > 0
                                ? `https://yeeeum.s3-us-west-1.amazonaws.com/${r.images[0].img_url}`
                                : "/assets/img/food.png"
                            }
                            onLoad={() => setImgLoaded(true)}
                            loader={
                              <ContentLoader
                                height={440}
                                width={380}
                                speed={2}
                                primaryColor="#f3f3f3"
                                secondaryColor="#ecebeb"
                              ></ContentLoader>
                            }
                          />

                          {imgLoaded && (
                            <div class="details">
                              <span class="title">{r.title}</span>
                              <span class="info">{r.description}</span>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                    <figcaption className="info-wrap">
                      <div className="row mt-2 like-aligner">
                        <div
                          className="col-9 "
                          style={{
                            paddingLeft: "0!important",
                            paddingRight: "0!important"
                          }}
                        >
                          {imgLoaded ? (
                            <Fragment>
                              <Link
                                to={`/recipe/${r.id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <Truncate
                                  width={200}
                                  className="sub-article-title"
                                  lines={2}
                                  ellipsis={<span>...</span>}
                                >
                                  {r.title}
                                </Truncate>
                              </Link>
                              <br />
                              <div className="pt-1">
                                <Link
                                  className="author-name"
                                  style={{
                                    color: "grey",
                                    textTransform: "uppercase",
                                    textDecoration: "none"
                                  }}
                                  to={`user/${r.user_id}`}
                                >
                                  {r.user_name}
                                </Link>
                              </div>
                            </Fragment>
                          ) : (
                            <h1></h1>
                          )}
                        </div>
                        {imgLoaded && (
                          <div
                            className="col-2 text-center ml-auto"
                            onClick={() => likeButton(r.id)}
                          >
                            <LikeRotator likes={r.like} isLiked={r.isLiked} />
                          </div>
                        )}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              )}
            </>
          );
        })}
    </>
  );
}
