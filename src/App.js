import React, { useState, useEffect, useLayoutEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { AppSidebar } from "@coreui/react";
import { AnimatePresence } from "framer-motion";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import "./App.scss";
import "./App.css";
import Sidebar from "./views/Sidebar/Sidebar";
import { scaleDown as Menu } from "react-burger-menu";
import AppNavBar from "./components/AppNavBar/AppNavBar";
import ReactResizeDetector from "react-resize-detector";
import RecipeTimer from "./components/RecipeTimer/RecipeTimer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import Timer from "react-compound-timer";
import Sound from "react-sound";
import { Fab } from "@material-ui/core";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
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
const ComingSoon = React.lazy(() =>
  import("./views/Pages/ComingSoon/ComingSoon.js")
);
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
  const [time, setTime] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [fbId, setFbId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);
  const [modal, setModal] = useState(false);
  const [initialTime, setInitialTime] = useState(5000);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {}, [time]);

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

  const toggle = () => {
    setPlayStatus(Sound.status.STOPPED);
    setModal(!modal);
  };

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

  const renderTime = value => {};

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
    width: "108px",
    height: "6%",
    right: "25px",
    bottom: "15px",
    backgroundColor: "#919191",
    textTransform: "none",
    fontWeight: "bold",
    zIndex: "30"
  };

  var sidebarStyles = {
    bmBurgerButton: {
      position: "fixed",
      width: "18px",
      height: "12px",
      left: "23.5px",
      top: "18px",
      color: "#bababa"
    },
    bmBurgerBars: {
      background: "#373a47",
      outline: "none"
    },
    bmBurgerBarsHover: {
      background: "#a90000"
    },
    bmCrossButton: {
      height: "24px",
      width: "24px"
    },
    bmCross: {
      background: "#bdc3c7"
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%"
    },
    bmMenu: {
      background: "#ffffff",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em"
    },
    bmMorphShape: {
      fill: "#373a47"
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em"
    },
    bmItem: {
      display: "inline-block"
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)"
    }
  };

  return (
    <>
      <Fab style={fabStyle} variant="extended">
        <HelpOutlineIcon className="mr-1" />
        <span className="fab-text">Help</span>
      </Fab>

      <AppSidebar fixed display="lg" id="sidebar-container">
        <Sidebar
          fbId={fbId}
          user={user}
          setUser={setUser}
          userId={userId}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setUserId={setUserId}
          setUserImg={setUserImg}
          userImg={userImg}
          setFbId={setFbId}
          setModal={setModal}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          returnSearchResults={returnSearchResults}
        />
      </AppSidebar>
      <ReactResizeDetector
        handleWidth
        handleHeight
        render={({ width, height }) => (
          <span>{width > 600 ? setSidebarOpen(!sidebarOpen) : false}</span>
        )}
      />
      <main className="main">
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Timer</ModalHeader>
          <ModalBody>
            <CountdownCircleTimer
              // onComplete={() => {}}
              renderTime={renderTime}
              isPlaying={() => setIsPlaying(true)}
              durationSeconds={time}
              colors={[["#A30000"]]}
            />

            <React.Fragment>
              {/* {console.log("recicitimer", <RecipeTimer />)} */}
              <RecipeTimer setTime={setTime} />
              <h1>{time}</h1>
              <Sound
                url="../../assets/Sounds/glass_bubbles.mp3"
                playStatus={playStatus}
                // playFromPosition={300 /* in milliseconds */}
                loop={true}
                // onLoading={handleSongLoading}
                // onPlaying={handleSongPlaying}
                // onFinishedPlaying={handleSongFinishedPlaying}
              />
            </React.Fragment>
          </ModalBody>
        </Modal>
      </main>
      <Menu
        width={250}
        isOpen={sidebarOpen}
        styles={sidebarStyles}
        display="sm"
      >
        <Sidebar
          fbId={fbId}
          user={user}
          setUser={setUser}
          userId={userId}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setUserId={setUserId}
          setUserImg={setUserImg}
          userImg={userImg}
          setFbId={setFbId}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          returnSearchResults={returnSearchResults}
        />
      </Menu>
      <AppNavBar
        fixed
        fbId={fbId}
        user={user}
        setUser={setUser}
        userId={userId}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        setUserId={setUserId}
        setUserImg={setUserImg}
        userImg={userImg}
        setFbId={setFbId}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        returnSearchResults={returnSearchResults}
      />
      <ToastContainer />
      <React.Suspense fallback={loading()} style={{ position: "relative" }}>
        {/* <AnimatePresence> */}
        <Switch location={location} key={location.pathname}>
          <Route
            path="/pro"
            name="coming soon"
            render={props => (
              <ComingSoon
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
            path="/shop"
            name="coming soon"
            render={props => (
              <ComingSoon
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
            path="/articles"
            name="coming soon"
            render={props => (
              <ComingSoon
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
