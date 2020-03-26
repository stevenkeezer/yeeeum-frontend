import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "../RecipeCard/RecipeCard.css";
import ContentLoader from "react-content-loader";
import Img from "react-image";
import LikeRotator from "../LikeRotator/LikeRotator";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "react-reveal/Fade";

export default function RecipeCard(props) {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    props.getPosts && props.getPosts();
  }, []);

  return (
    <>
      <div
        key={props.recipe.id}
        ref={props.lastRecipeRef}
        className="col-lg-4 col-xl-3  col-md-6 col-12 product-div pb-4 pl-2 pr-2"
      >
        <Fade>
          <figure className="card">
            <div className="img-wrap">
              <Link to={`/recipe/${props.recipe.id}`}>
                <div
                  className="image-container caption shadow-sm"
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
                    }}
                    className="img-responsive transition"
                    src={
                      props.recipe.images.length > 0
                        ? `https://yeeeum.s3-us-west-1.amazonaws.com/${props.recipe.images[0].img_url}`
                        : "./assets/img/food.png"
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
                    <div className="details">
                      <span className="title">{props.recipe.title}</span>
                      <span className="info">{props.recipe.description}</span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
            <figcaption className="info-wrap">
              <div className="mt-2 d-flex">
                <div
                  className="w-100"
                  style={{
                    paddingLeft: "0!important",
                    paddingRight: "0!important"
                  }}
                >
                  {imgLoaded ? (
                    <Fragment>
                      <Link
                        className="sub-article-title pr-2"
                        to={`/recipe/${props.recipe.id}`}
                        style={{
                          textDecoration: "none",
                          wordBreak: "keep-all"
                        }}
                      >
                        {props.recipe.title}
                      </Link>
                      <div className="pt-1">
                        <Link
                          className="author-name"
                          style={{
                            color: "grey",
                            textTransform: "uppercase",
                            textDecoration: "none"
                          }}
                          to={`user/${props.recipe.user_id}`}
                        >
                          {props.recipe.user_name}
                        </Link>
                      </div>
                    </Fragment>
                  ) : (
                    <h1></h1>
                  )}
                </div>
                {imgLoaded && (
                  <div
                    className="col-2 text-center ml-auto like-rotator"
                    onClick={() => props.likeButton(props.recipe.id)}
                  >
                    <LikeRotator
                      likes={props.recipe.like}
                      isLiked={props.recipe.isLiked}
                    />
                  </div>
                )}
              </div>
            </figcaption>
          </figure>
        </Fade>
      </div>
    </>
  );
}
