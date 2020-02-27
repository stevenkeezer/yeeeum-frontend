import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import ContentLoader from "react-content-loader";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import FavoriteIcon from "@material-ui/icons/Favorite";
import KitchenIcon from "@material-ui/icons/Kitchen";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Lock";
import Img from "react-image";
import AddIcon from "@material-ui/icons/Add";
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

  const closeSidebar = () => {
    document.querySelector("body").className = "sidebar-lg-show sidebar-fixed";
  };

  const clickHandler = () => {
    props.setSidebarOpen(!props.sidebarOpen);
  };

  props.setSidebarOpen(false);

  return (
    <div className="">
      <div className="logo-container">
        <Link
          to={"/"}
          className="logo"
          style={{ textDecoration: "none" }}
          isOpen={false}
        >
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

      <nav className="sidebar-nav">
        <div className="login-button">
          <Link to={"/login"} onClick={() => clickHandler()}>
            {!props.user && (
              <div className="p-3">
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
        <div className="profile-img-container">
          {!props.userImg && props.fbId && localStorage.getItem("login") && (
            <div className="img-container" style={{ minHeight: "103px" }}>
              <NavLink
                activeClassName="profile-button"
                to={"/profile"}
                onClick={() => clickHandler()}
              >
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
                />
              </NavLink>
            </div>
          )}
          {props.userImg && (
            <div className="img-container" style={{ minHeight: "103px" }}>
              <NavLink
                activeClassName="profile-button"
                to={"/profile"}
                onClick={() => clickHandler()}
              >
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
              </NavLink>
            </div>
          )}
          {!props.userImg && !props.fbId && props.user && (
            <div className="img-container" style={{ minHeight: "100px" }}>
              <NavLink
                activeClassName="profile-button"
                to={"/profile"}
                onClick={() => clickHandler()}
              >
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
              </NavLink>
            </div>
          )}
        </div>

        <ul className="nav">
          <li className="nav-item">
            {props.user ? (
              <NavLink
                to={"/"}
                exact
                activeClassName="is-active"
                className="nav-link sidebar-link"
                onClick={() => clickHandler()}
              >
                <span className="ml-4">{props.user.split(" ")[0]}'s Feed</span>
              </NavLink>
            ) : (
              <NavLink
                to={"/"}
                exact
                activeClassName="is-active"
                className="nav-link sidebar-link"
                onClick={() => clickHandler()}
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
              onClick={() => clickHandler()}
            >
              <span className="ml-4">Browse</span>
              <span style={{ color: "#f15924" }} className="badge">
                NEW
              </span>
            </NavLink>
          </li>

          {props.user && (
            <li className="nav-item">
              <NavLink
                to={"/compose"}
                activeClassName="is-active"
                className="nav-link sidebar-link"
                onClick={() => clickHandler()}
              >
                <span className="ml-4">Compose</span>
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink
              to={"/recipe"}
              activeClassName="is-active"
              className="nav-link sidebar-link"
              onClick={() => clickHandler()}
            >
              <span className="ml-4">Articles</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/register"}
              activeClassName="is-active"
              className="nav-link sidebar-link"
              onClick={() => clickHandler()}
            >
              <span className="ml-4">Yeeeum Pro</span>
            </NavLink>
          </li>
          <NavLink
            to={"/login"}
            activeClassName="is-active"
            className="nav-link "
            onClick={() => clickHandler()}
          >
            <span className=" ml-4 compose-button">
              <AddIcon
                style={{
                  width: "20px",
                  marginTop: "-4px"
                }}
              />
              Compose
            </span>
          </NavLink>
          <li className="nav-item">
            {/* <button
              exact={true}
              onClick={() => {
                // pushRegister();
                props.setModal(true);
              }}
              activeClassName="is-active"
              className="nav-link sidebar-link ml-4"
              style={{ border: "none!important", padding: "none!important" }}
              data-toggle="sidebar-show"
            >
              <AlarmAddIcon
                style={{
                  width: "20px",
                  marginTop: "-4px",
                  marginRight: "10px"
                }}
              />
              Add Timer
            </button> */}
          </li>

          <li className="nav-item mt-3">
            <Link
              exact={true}
              onClick={() => clickHandler()}
              className="pl-2 ml-4  saved-recipes"
              style={{
                textTransform: "uppercase",
                color: "#22272c"
              }}
            >
              SAVED RECIPES
            </Link>

            <Link
              exact={true}
              onClick={() => clickHandler()}
              className="nav-link sidebar-link-no-bcg ml-4 mt-2"
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
              className="nav-link sidebar-link-no-bcg ml-4 mt-1"
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
              className="nav-link sidebar-link-no-bcg ml-4 mt-1"
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
              className="nav-link sidebar-link-no-bcg ml-4 mt-1"
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
              className="nav-link sidebar-link-no-bcg ml-4 mt-1"
              to={"/favorites"}
            >
              <FastfoodIcon
                style={{
                  width: "20px",
                  marginTop: "-4px",
                  marginRight: "10px"
                }}
              />
              Quick Eats
            </Link>
            <Link
              exact={true}
              className="nav-link sidebar-link-no-bcg ml-4 mt-1"
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

            <br></br>
            {/* <img
              style={{ width: "100px" }}
              src="/assets/img/appstore.png"
            ></img> */}
            {props.user && (
              <li
                className="nav-item"
                style={{ marginBottom: "150px" }}
                onClick={() => clickHandler()}
              >
                <button
                  exact
                  onClick={logout}
                  activeClassName="is-active"
                  className="nav-link sidebar-link "
                  style={{
                    border: "none!important",
                    padding: "none!important"
                  }}
                >
                  <LockIcon
                    className="ml-4"
                    fontSize="small"
                    style={{
                      width: "20px",
                      marginTop: "-4px",
                      marginRight: "10px"
                    }}
                  />
                  Logout
                </button>
              </li>
            )}

            <div
              exact={true}
              style={{ width: "205px" }}
              className="nav-footer mx-auto mb-3"
              to={"/favorites"}
            >
              <div
                style={{
                  textAlign: "center",
                  marginTop: "12%",
                  color: "#00a287",
                  width: "100%"
                }}
                className="w-100 col-12 mx-auto"
              >
                <div className="col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 36 36"
                    fill="#00a287"
                  >
                    <path d="M9 15c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm18 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-9 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>

                  <br height={"10px"}></br>
                </div>
                <Button
                  className="more mb-4"
                  href="#text-buttons"
                  style={{
                    marginTop: "-24px",
                    textDecoration: "none",
                    fontSize: ".75rem",
                    fontWeight: "bold"
                  }}
                >
                  MORE
                </Button>
                <br></br>
                <br></br>
              </div>
            </div>
          </li>

          <li className="pl-2 mt-auto ">
            <div className="row  nav-footer mx-auto" style={{ padding: "2px" }}>
              <a className="p-1" href="https://coreui.io">
                Privacy
              </a>
              <a className="p-1" href="https://coreui.io">
                Terms
              </a>
              <a
                className="p-1 pr-2"
                href="https://coreui.io"
                style={{
                  bottom: "0"
                }}
              >
                Internet Based Ads
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
