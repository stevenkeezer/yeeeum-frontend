import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import ContentLoader from "react-content-loader";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import FavoriteIcon from "@material-ui/icons/Favorite";
import KitchenIcon from "@material-ui/icons/Kitchen";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Img from "react-image";
import { useHistory } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar(props) {
  let history = useHistory();
  const logout = async () => {
    const response = await fetch(process.env.REACT_APP_BURL + "logout", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success === true) {
        localStorage.clear("token");
        localStorage.clear("login");
        window.location.replace("/login");
        if (props.user) {
          props.setUser(null);
          props.setUserImg(null);
        }
      }
    }
  };

  const pushRegister = () => {
    history.push("/register");
  };

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <div className="logo-container">
          <Link to={"/"} className="logo" style={{ textDecoration: "none" }}>
            <img width="100px" src="/assets/img/logo.png"></img>
          </Link>
        </div>
        <hr
          id="separator"
          style={{
            width: "23px",
            height: "30px!important",
            color: "lightgrey!important",
            borderTop: "3px solid rgba(0, 0, 0, 0.1)"
          }}
        ></hr>
        <div className="login-button">
          <Link to={"/login"}>
            {!props.user && (
              <div className="p-3 pb-5">
                <button
                  className="btn-lg sidebar-login-button"
                  style={{
                    fontSize: ".8rem",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "#08a287",
                    borderRadius: "3.5rem",
                    marginLeft: "9px",
                    outline: "none"
                  }}
                >
                  Sign Up / Log In
                </button>
              </div>
            )}
          </Link>
        </div>
        <Link to={"/profile"}>
          <div className="profile-img-container">
            {!props.userImg && props.fbId && localStorage.getItem("login") && (
              <div className="img-container" style={{ minHeight: "100px" }}>
                <Img
                  alt="profilepicture"
                  className="rounded-circle profile-img mx-auto"
                  loader={
                    <ContentLoader
                      className="profile-load-img mx-auto"
                      height={160}
                      width={600}
                      speed={2}
                      primaryColor="#f3f3f3"
                      secondaryColor="#ecebeb"
                    >
                      <circle cx="258" cy="73" r="51" />
                    </ContentLoader>
                  }
                  src={`https://graph.facebook.com/${props.fbId}/picture?width=70&height=70 `}
                ></Img>
              </div>
            )}
            {props.userImg && (
              <div className="img-container" style={{ minHeight: "100px" }}>
                <Img
                  alt="profilepicture"
                  className="rounded-circle profile-img"
                  loader={
                    <ContentLoader
                      className="profile-load-img"
                      height={160}
                      width={400}
                      speed={2}
                      primaryColor="#f3f3f3"
                      secondaryColor="#ecebeb"
                    >
                      <circle cx="200" cy="80" r="51" />
                    </ContentLoader>
                  }
                  src={`https://yeeeum.s3-us-west-1.amazonaws.com/${props.userImg}`}
                ></Img>
              </div>
            )}
            {!props.userImg && !props.fbId && props.user && (
              <div className="img-container" style={{ minHeight: "100px" }}>
                <Img
                  alt="profilepicture"
                  className="rounded-circle profile-img"
                  loader={
                    <ContentLoader
                      className="profile-load-img mx-auto"
                      height={160}
                      width={400}
                      speed={2}
                      primaryColor="#f3f3f3"
                      secondaryColor="#ecebeb"
                    >
                      <circle cx="296" cy="90" r="51" />
                    </ContentLoader>
                  }
                  src="assets/img/default.png"
                ></Img>
              </div>
            )}
          </div>
        </Link>

        <ul className="nav">
          <li className="nav-item">
            {props.user ? (
              <NavLink
                to={"/"}
                exact
                activeClassName="is-active"
                className="nav-link sidebar-link"
              >
                <span className="ml-4">{props.user.split(" ")[0]}'s Feed</span>
              </NavLink>
            ) : (
              <NavLink
                to={"/"}
                exact
                activeClassName="is-active"
                className="nav-link sidebar-link"
              >
                <span className="ml-4">Feed</span>
              </NavLink>
            )}
          </li>
          <li className="nav-item">
            <NavLink
              to={"/extractor"}
              activeClassName="is-active"
              className="nav-link sidebar-link"
            >
              <span className="ml-4">R-Extractor</span>
              <span style={{ color: "#f15924" }} className="badge">
                NEW
              </span>
            </NavLink>
          </li>
          {props.user && (
            <li className="nav-item">
              <NavLink
                exact
                to={"/compose"}
                activeClassName="is-active"
                className="nav-link sidebar-link"
              >
                <span className="ml-4">Compose</span>
              </NavLink>
            </li>
          )}
          {props.user && (
            <li className="nav-item">
              <button
                exact
                onClick={logout}
                activeClassName="is-active"
                className="nav-link sidebar-link"
                style={{ border: "none!important", padding: "none!important" }}
              >
                <span className="ml-4">Logout</span>
              </button>
            </li>
          )}
          <li className="nav-item">
            <button
              exact={true}
              onClick={pushRegister}
              activeClassName="is-active"
              className="nav-link sidebar-link "
              style={{ border: "none!important", padding: "none!important" }}
            >
              <span className="ml-4">Get Started</span>
            </button>
          </li>
          <li className="nav-item">
            <Link
              to="hi"
              className="nav-link sidebar-link-no-bcg ml-4 mt-3 mb-1"
            >
              <strong
                className="saved-recipes"
                style={{ textTransform: "uppercase", color: "#22272c" }}
              >
                <span>Saved Recipes</span>
              </strong>
            </Link>
            <Link
              exact={true}
              className="nav-link sidebar-link-no-bcg ml-4"
              to={"/favorites"}
            >
              <FavoriteIcon
                style={{
                  width: "20px",
                  marginTop: "-4px",
                  marginRight: "10px"
                }}
              />
              Favorites
            </Link>
            <Link
              exact={true}
              to={"/favorites"}
              className="nav-link sidebar-link-no-bcg ml-4"
            >
              <LocalBarIcon
                style={{
                  width: "20px",
                  marginTop: "-4px",
                  marginRight: "10px"
                }}
              />
              Drinks
            </Link>
            <Link
              exact={true}
              className="nav-link sidebar-link-no-bcg ml-4"
              to={"/favorites"}
            >
              <LocalDiningIcon
                style={{
                  width: "20px",
                  marginTop: "-4px",
                  marginRight: "10px"
                }}
              />
              Dinners
            </Link>
            <Link
              exact={true}
              className="nav-link sidebar-link-no-bcg ml-4"
              to={"/favorites"}
            >
              <KitchenIcon
                style={{
                  width: "20px",
                  marginTop: "-4px",
                  marginRight: "10px"
                }}
              />
              Yeeeums
            </Link>
            <Link
              exact={true}
              className="nav-link sidebar-link-no-bcg ml-4"
              to={"/favorites"}
            >
              <WhatshotIcon
                style={{
                  width: "20px",
                  marginTop: "-4px",
                  marginRight: "10px"
                }}
              />
              Popular
            </Link>
            <Link
              exact={true}
              className="nav-link sidebar-link-no-bcg ml-4"
              to={"/favorites"}
            >
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10%",
                  color: "#00a287",
                  marginRight: "20px"
                }}
              >
                <MoreHorizIcon fontSize="large" />
                <br></br>
                <span
                  className="more"
                  style={{ marginTop: "-20px!important", color: "grey" }}
                >
                  MORE
                </span>
              </div>
            </Link>
          </li>

          <li className="pl-2 mt-auto">
            <div className="row nav-footer mx-auto">
              <a className="p-1" href="https://coreui.io">
                Privacy
              </a>
              <a className="p-1" href="https://coreui.io">
                Terms
              </a>
              <a className="p-1" href="https://coreui.io">
                Internet Based Ads
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
