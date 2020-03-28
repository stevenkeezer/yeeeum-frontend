import React, {
  Suspense,
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import { Link } from "react-router-dom";
import RecipeItem from "../../components/RecipeItem/RecipeItem";
import SearchForm from "./SearchForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "react-reveal/Fade";
import Lottie from "react-lottie";
import animationData from "../../assets/loading.json";

import { motion } from "framer-motion";
import { css } from "@emotion/core";
// First way to import
import ClipLoader from "react-spinners/ClipLoader";
import { HeartSpinner } from "react-spinners-kit";

import "./Dashboard.css";

function Dashboard(props) {
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const lastRecipeRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(page + 1);
        }
      },
      [loading, hasMore]
    );
    if (node) observer.current.observe(node);
    console.log("node", node);
  });

  const observer = useRef();

  const getPosts = async () => {
    setLoading(true);
    try {
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

      console.log("response", response);
      const data = await response.json();
      window.history.replaceState({}, document.title, window.location.pathname);
      setRecipes([...recipes, ...data]);
      setHasMore(data.length > 0);
      setLoading(false);
    } catch (error) {
      getPosts();
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

  useEffect(() => {
    getPosts();
  }, [page]);

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

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red"
  };

  const pageTransition = {
    type: "tween",
    transition: "linear",
    ease: "anticipate",
    duration: 1
    // scale: 0.8
  };

  const buttonStyle = {
    display: "block",
    margin: "10px auto"
  };

  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <>
      <motion.div
        style={style}
        exit="out"
        animate="in"
        initial="initial"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div
          style={{
            paddingTop: "2.49%",
            marginBottom: "3.5%"
            // backgroundImage: "linear-gradient(#f6f6f6, #ffffff)"
          }}
        >
          <div className="mx-auto" style={{ maxWidth: "1260px" }}>
            <SearchForm returnSearchResults={returnSearchResults} />
          </div>
        </div>
        <div className="banner-container col-xs-12 col-sm-12 pl-0 col-lg-12">
          <div className="col-xl-4 col-lg-4 pl-0 banner-sub-container">
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
              className="col-lg-12 col-8 about "
            >
              <p style={{ fontSize: "15px", lineHeight: "1.64rem" }}>
                Get organized and save time with a convenient recipe database
                that's always at your fingertips. Now available on web, phone,
                and tablet.
              </p>
            </div>
            <div
              className="col-lg-4 button-container"
              style={{ lineHeight: "1.625" }}
            >
              <Link to={"/register"}>
                <button href="#bottom" className="join-newsletter-btn">
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
            height: "460px",
            transform: "rotateY(180deg)",
            zIndex: -1
          }}
        ></div>

        <div
          className="col-xl-10 col-lg-11 col-sm-12 col-12 container  mx-auto recipes-container  "
          onScroll={() => console.log("hi")}
        >
          <div className="col-12 pl-0">
            <h3
              className="foryou"
              style={{ marginBottom: "4.8%", marginLeft: "-8px" }}
            >
              Recipes For You
            </h3>
          </div>

          <div className="row mx-auto">
            <div className="row">
              {recipes &&
                recipes.map((recipe, index) => {
                  if (recipes.length === index + 1) {
                    return (
                      <RecipeItem
                        lastRecipeRef={lastRecipeRef}
                        recipe={recipe}
                        likeButton={likeButton}
                      />
                    );
                  } else {
                    return (
                      <RecipeItem recipe={recipe} likeButton={likeButton} />
                    );
                  }
                })}
            </div>

            {loading && (
              <div className="sweet-loading mx-auto text-center mt-3">
                <Lottie
                  options={options}
                  // style={{ width: 40, height: 40 }}
                  height={75}
                  width={75}
                  isStopped={false}
                  isPaused={false}
                />

                <div
                  class="loading-text text-center pb-3 pt-1"
                  style={{ fontSize: 18 }}
                >
                  <span className="pl-2">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Dashboard;
