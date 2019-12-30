import React, { Suspense, useEffect, useState } from "react";
import { AppHeader, AppSidebar, AppSidebarHeader } from "@coreui/react";
import DefaultHeader from "../../../containers/DefaultLayout/DefaultHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import RecipeCard from "./RecipeCard";
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

  useEffect(() => {
    getFavPosts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHideSpinner(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0
      // x: "-100vw"
    },
    in: {
      opacity: 1
      // x: 0
    },
    out: {
      opacity: 0
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
      <AppHeader fixed display="xl">
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => this.signOut(e)} props={props} />
        </Suspense>
      </AppHeader>

      <motion.div
        style={style}
        exit="out"
        animate="in"
        initial="initial"
        variants={pageVariants}
        transition={pageTransition}
      >
        <main className="main">
          <div className="col-11 col-xl-9 col-lg-10 mx-auto pt-4">
            <h3
              style={{ marginLeft: "-7px", fontWeight: "bold" }}
              className="pt-5 pb-3 favorites-header"
            >
              Your Favorites
            </h3>
            <div className="row">
              {favorites.length < 1 && (
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
                favorites={favorites}
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
