import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";
import ContentLoader from "react-content-loader";
import Img from "react-image";
import LikeRotator from "../LikeRotator/LikeRotator";
import CircularProgress from "@material-ui/core/CircularProgress";
import Truncate from "react-truncate";
import { AnimatePresence, motion } from "framer-motion";

export default function RecipeCard(props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    props.getPosts && props.getPosts();
  }, [props.page]);

  return (
    <>
      {props.recipes.length < 1 && (
        <div className="d-flex mx-auto justify-content-center align-self-center">
          <CircularProgress
            style={{
              marginTop: "13%",
              color: "#00a287"
            }}
          />
        </div>
      )}

      {props.recipes.map((r, i) => {
        if (i === 1) {
        }
        return (
          <div
            key={r.id}
            className="col-lg-4 col-xl-3 col-md-6 product-div pb-4 pl-2 pr-2"
          >
            {!r.deleted && (
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
                      className="image-container caption"
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
                        width="100%"
                        className="img-responsive transition"
                        src={
                          r.images.length > 0
                            ? `https://yeeeum.s3-us-west-1.amazonaws.com/${r.images[0].img_url}`
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
                          <span className="title">{r.title}</span>
                          <span className="info">{r.description}</span>
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
                            className="sub-article-title"
                            to={`/recipe/${r.id}`}
                            style={{
                              textDecoration: "none"
                            }}
                          >
                            {r.title}
                          </Link>
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
                        className="col-2 text-center ml-auto like-rotator"
                        onClick={() => props.likeButton(r.id)}
                      >
                        <LikeRotator likes={r.like} isLiked={r.isLiked} />
                      </div>
                    )}
                  </div>
                </figcaption>
              </figure>
            )}
          </div>
        );
      })}
    </>
  );
}
