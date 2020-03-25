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

import { motion } from "framer-motion";
import { css } from "@emotion/core";
// First way to import
import BeatLoader from "react-spinners/BeatLoader";

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
            paddingTop: "2.5%",
            marginBottom: "3.5%"
            // backgroundImage: "linear-gradient(#f6f6f6, #ffffff)"
          }}
        >
          <div className="mx-auto" style={{ maxWidth: "1260px" }}>
            <SearchForm returnSearchResults={returnSearchResults} />
          </div>
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
              className="col-lg-12 col-8 about "
            >
              <p style={{ fontSize: "16px", lineHeight: "1.7rem" }}>
                Yeeeum is a recipe application designed with busy people in
                mind. Store your own recipes and save your favorites.
              </p>
            </div>
            <div
              className="col-lg-4 button-container"
              style={{ lineHeight: "1.625" }}
            >
              <Link to={"/register"}>
                <button href="#bottom" className="join-newsletter-btn pt-2">
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
            height: "480px",
            transform: "rotateY(180deg)"
          }}
        ></div>

        <div
          className="col-xl-10 col-lg-11 col-sm-12 col-12 container mx-auto recipes-container  "
          onScroll={() => console.log("hi")}
          style={{ padding: 38 }}
        >
          <div className="col-12">
            <h3
              className="foryou"
              style={{ marginBottom: "3%", marginLeft: "-8px" }}
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
                      />
                    );
                  } else {
                    return <RecipeItem recipe={recipe} />;
                  }
                })}
            </div>
            {loading && (
              <div className="sweet-loading mx-auto mt-3 ">
                <BeatLoader
                  css={override}
                  size={10}
                  //size={"150px"} this also works
                  color={"rgba(0,0,0,0.36)"}
                  loading={loading}
                />
              </div>
            )}
            {/* <RecipeCard
              recipes={recipes}
              likeButton={likeButton}
              getPosts={getPosts}
              page={page}
              ref={lastRecipeRef}
            /> */}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Dashboard;
