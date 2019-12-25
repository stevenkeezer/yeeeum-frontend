import React, { Suspense, useEffect, useState } from "react";
import { AppHeader, AppSidebar, AppSidebarHeader } from "@coreui/react";
import { useHistory, useParams } from "react-router-dom";
import DefaultHeader from "../../../containers/DefaultLayout/DefaultHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import Sidebar from "../../Sidebar/Sidebar";
import RecipeCard from "../../../components/RecipeCard/RecipeCard";
import FavRecipeCard from "./FavRecipeCard";
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
      setRecipes(data[0].filter(recipe => !recipe.deleted));
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
      setFavorites(data.filter(favorite => favorite.deleted === false));
    }
  };

  useEffect(() => {
    getUserRecipes();
  }, []);

  return (
    <div>
      <AppHeader fixed display="xl">
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => this.signOut(e)} props={props} />
        </Suspense>
      </AppHeader>

      <main className="main">
        <div className="animated fadeIn">
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
                    setRecipes={setRecipes}
                    recipes={recipes}
                    getFavPosts={getFavPosts}
                    getUserRecipes={getUserRecipes}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center">
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
        </div>
      </main>
    </div>
  );
}
