import React, { Suspense, useEffect, useState } from "react";
import { AppHeader, AppSidebar, AppSidebarHeader } from "@coreui/react";
import DefaultHeader from "../../../containers/DefaultLayout/DefaultHeader";
import { motion } from "framer-motion";
import RecipeCard from "../../../components/RecipeCard/RecipeCard";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import CircularProgress from "@material-ui/core/CircularProgress";
import Uppy from "@uppy/core";
import Webcam from "@uppy/webcam";
import XHRUpload from "@uppy/xhr-upload";
import { DashboardModal } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "./Profile.css";

export default function Profile(props) {
  const [handleOpen, setHandleOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeData, setRecipeData] = useState([]);

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const getUserPosts = async () => {
    const response = await fetch(process.env.REACT_APP_BURL + `profile`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      const notDeleted = data.filter(recipe => !recipe.deleted);
      const rows = notDeleted.map(r => {
        return createData(
          r.id,
          r.title,
          r.ingredients.length,
          r.description,
          r.likes
        );
      });
      setRecipeData(notDeleted);
      setRecipes(rows);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const uppyRef = React.useRef();

  if (!uppyRef.current) {
    uppyRef.current = Uppy({
      autoProceed: true,
      bundle: false
    })
      .use(XHRUpload, {
        endpoint:
          process.env.REACT_APP_BURL + `add_profile_image/${props.userId}`,
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .use(Webcam, {})
      .on("upload-success", async (files, response) => {
        props.setUserImg(response.body[0]);
      });
  }

  const options = {
    height: 300,
    inline: true
  };

  return (

      <div>
        <AppHeader fixed display="xl">
          <Suspense fallback={loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} props={props} />
          </Suspense>
        </AppHeader>

        <main className="main">
          <div className="col-11 col-xl-9 col-lg-10 mx-auto">
            <div className="row pt-5">
              <div className="pb-5 mt-3">
                {!props.userImg && props.fbId && (
                  <img
                    width="80px"
                    alt=""
                    className="rounded-circle profile-circle"
                    src={`https://graph.facebook.com/${props.fbId}/picture?width=100&height=100`}
                  ></img>
                )}

                {props.userImg && (
                  <img
                    width="100px"
                    alt=""
                    className="rounded-circle profile-circle"
                    src={`https://yeeeum.s3-us-west-1.amazonaws.com/${props.userImg}`}
                  ></img>
                )}

                {!props.userImg && !props.fbId && (
                  <img
                    alt=""
                    className="rounded-circle profile-circle"
                    src={"/assets/img/default.png"}
                    width="100px"
                  ></img>
                )}
              </div>
              <div className="col">
                <h3 className="pt-3 username">{props.user}</h3>
                <button
                  className="btn btn-secondary btn-sm add-img-button"
                  onClick={() => setHandleOpen(true)}
                >
                  Change Image
                  <PhotoLibraryIcon className="ml-1" />
                </button>
              </div>
              <DashboardModal
                uppy={uppyRef.current}
                closeModalOnClickOutside
                open={handleOpen}
                onRequestClose={() => setHandleOpen(false)}
                plugins={["Webcam"]}
              />
            </div>

            {/* <RecipeTable recipes={recipes} /> */}

            <h3 style={{ marginLeft: "-7px" }} className="pt-4 your-recipes">
              Your Recipes
            </h3>
            {recipes.length < 1 ? (
              <div className="d-flex justify-content-center">
                <CircularProgress
                  style={{ marginTop: "13%", color: "#00a287" }}
                />
              </div>
            ) : (
              <div className="row pt-3">
                <RecipeCard
                  className="mx-auto"
                  recipes={recipeData}
                  setRecipes={setRecipeData}
                  getUserPosts={getUserPosts}
                />
              </div>
            )}
          </div>
        </main>
      </div>
  );
}
