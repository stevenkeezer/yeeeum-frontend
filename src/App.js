import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { AppHeader, AppSidebar } from "@coreui/react";
import { AnimatePresence } from "framer-motion";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import "./App.scss";
import "./App.css";
import Sidebar from "./views/Sidebar/Sidebar";
import AppNavBar from "./components/AppNavBar/AppNavBar";
import { Fab } from "@material-ui/core";

import { ToastContainer, toast } from "react-toastify";
import Transition from "react-transition-group/Transition";
import "react-toastify/dist/ReactToastify.css";

const loading = () => <div className="animated fadeIn pt-3 text-center"></div>;

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const Home = React.lazy(() => import("./views/Pages/Home/Home.js"));
const Recipe = React.lazy(() => import("./views/Pages/Recipe/Recipe.js"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Compose = React.lazy(() => import("./views/Pages/Compose/Compose.js"));
const UploadFiles = React.lazy(() =>
  import("./views/Pages/Compose/UploadFiles/UploadFiles.js")
);
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));
const Favorites = React.lazy(() => import("./views/Pages/Favorites/Favorites"));
const Profile = React.lazy(() => import("./views/Pages/Profile/Profile"));
const Search = React.lazy(() => import("./views/Dashboard/SearchResults"));

const User = React.lazy(() => import("./views/Pages/User/User"));
const Extractor = React.lazy(() => import("./views/Pages/Extractor/Extractor"));

const PasswordReset = React.lazy(() =>
  import("./views/Pages/Login/PasswordReset")
);
const ResetRequest = React.lazy(() =>
  import("./views/Pages/Login/ResetRequest")
);

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [fbId, setFbId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const existingToken = localStorage.getItem("token");
  const accessToken =
    window.location.search.split("=")[0] === "?api_key"
      ? window.location.search.split("=")[1]
      : null;

  const [token, setToken] = useState(existingToken || accessToken);

  const getUserInfo = async () => {
    const response = await fetch(process.env.REACT_APP_BURL + `getuser`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user_name);
      setUserId(data.user_id);
      setUserImg(data.img_url);
      setFbId(data.fb_img_id);
      localStorage.setItem("token", token);
    } else {
      localStorage.clear("token");
      localStorage.clear("login");
    }
  };

  const returnSearchResults = values => {
    setSearchResults(values);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const location = useLocation();

  const Fade = ({ children, position, ...props }) => (
    <Transition
      {...props}
      timeout={{
        enter: 800,
        exit: 3000
      }}
      onEnter={node =>
        node.classList.add("toast-enter--top-right", "toastify-animated")
      }
      onEntered={node =>
        node.classList.remove("toastify-animated", "toast-enter--top-right")
      }
      onExit={node => {
        node.classList.add("fadeOut");
      }}
    >
      {children}
    </Transition>
  );

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  };

  const handleToast = () => {
    toast("Your recipe has been removed", toastOptions);
  };

  const fabStyle = {
    position: "fixed",
    width: "110px",
    height: "6.4%",
    right: "25px",
    bottom: "15px",
    backgroundColor: "#919191",
    textTransform: "none",
    fontWeight: "bold",
    zIndex: "30"
  };
  return (
    <>
      <Fab style={fabStyle} variant="extended">
        <HelpOutlineIcon className="mr-1" />
        <span>Help</span>
      </Fab>
      <AppSidebar fixed display="lg" id="sidebar-container">
        <Sidebar
          fbId={fbId}
          user={user}
          setUser={setUser}
          userId={userId}
          setUserId={setUserId}
          setUserImg={setUserImg}
          userImg={userImg}
          setFbId={setFbId}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          returnSearchResults={returnSearchResults}
        />
      </AppSidebar>
      <AppNavBar
        fixed
        fbId={fbId}
        user={user}
        setUser={setUser}
        userId={userId}
        setUserId={setUserId}
        setUserImg={setUserImg}
        userImg={userImg}
        setFbId={setFbId}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        returnSearchResults={returnSearchResults}
      />
      <ToastContainer />
      <React.Suspense fallback={loading()} style={{ position: "relative" }}>
        {/* <AnimatePresence> */}
        <Switch location={location} key={location.pathname}>
          <Route
            path="/upload_files"
            name="Upload Images"
            render={props => (
              <UploadFiles
                fbId={fbId}
                user={user}
                setUser={setUser}
                userId={userId}
                setUserId={setUserId}
                setUserImg={setUserImg}
                userImg={userImg}
                setFbId={setFbId}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            path="/reset_token/:token"
            name="Password Reset Page"
            render={props => (
              <PasswordReset
                fbId={fbId}
                user={user}
                setUser={setUser}
                userId={userId}
                setUserId={setUserId}
                setUserImg={setUserImg}
                userImg={userImg}
                setFbId={setFbId}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            path="/extractor"
            name="Extractor Page"
            render={props => (
              <Extractor
                fbId={fbId}
                user={user}
                setUser={setUser}
                userId={userId}
                setUserId={setUserId}
                setUserImg={setUserImg}
                userImg={userImg}
                setFbId={setFbId}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            path="/user/:id"
            name="User Profile Page"
            render={props => (
              <User
                fbId={fbId}
                user={user}
                setUser={setUser}
                userId={userId}
                setUserId={setUserId}
                setUserImg={setUserImg}
                userImg={userImg}
                setFbId={setFbId}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            exact
            path="/login"
            name="Login Page"
            render={props => (
              <Login
                user={user}
                fbId={fbId}
                userId={userId}
                setUser={setUser}
                userImg={userImg}
                setFbId={setFbId}
                setUserId={setUserId}
                setUserImg={setUserImg}
                getUserInfo={getUserInfo}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            exact
            path="/reset_request"
            name="Reset Password Page"
            render={props => (
              <ResetRequest
                fbId={fbId}
                user={user}
                setUser={setUser}
                userId={userId}
                setUserImg={setUserImg}
                userImg={userImg}
                setFbId={setFbId}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            exact
            path="/search"
            name="Search Page"
            render={props => (
              <Search
                fbId={fbId}
                user={user}
                setFbId={setFbId}
                setUser={setUser}
                userId={userId}
                setUserImg={setUserImg}
                userImg={userImg}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={props => (
              <Register
                setUser={setUser}
                userId={userId}
                setUserImg={setUserImg}
                user={user}
                userImg={userImg}
                fbId={fbId}
                setFbId={setFbId}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            exact
            path="/favorites"
            name="Favorites Page"
            render={props => (
              <Favorites
                setUser={setUser}
                userId={userId}
                setUserImg={setUserImg}
                user={user}
                userImg={userImg}
                fbId={fbId}
                setFbId={setFbId}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            name="User Page"
            render={props => (
              <Profile
                setUser={setUser}
                userId={userId}
                setUserImg={setUserImg}
                user={user}
                userImg={userImg}
                fbId={fbId}
                setFbId={setFbId}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            exact
            path="/compose"
            name="Compose Page"
            render={props => (
              <Compose
                userId={userId}
                setUser={setUser}
                setUserImg={setUserImg}
                user={user}
                userImg={userImg}
                fbId={fbId}
                setFbId={setFbId}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            exact
            path="/recipe/:id"
            name="Recipe Page"
            render={props => (
              <Recipe
                fbId={fbId}
                setUser={setUser}
                userId={userId}
                handleToast={handleToast}
                setUserImg={setUserImg}
                user={user}
                userImg={userImg}
                setFbId={setFbId}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={props => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={props => <Page500 {...props} />}
          />
          <Route
            path="/"
            name="Home"
            render={props => (
              <Home
                fbId={fbId}
                user={user}
                userId={userId}
                setFbId={setFbId}
                userImg={userImg}
                setUser={setUser}
                setUserImg={setUserImg}
                setSearchResults={setSearchResults}
                returnSearchResults={returnSearchResults}
              />
            )}
          />
        </Switch>
        {/* </AnimatePresence> */}
      </React.Suspense>
    </>
  );
}

export default App;
