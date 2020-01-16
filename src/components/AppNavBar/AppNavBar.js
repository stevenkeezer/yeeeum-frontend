import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Link, NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchFormHeader from "../../views/Dashboard/SearchFormHeader";
import "./AppNavBar.css";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Collapse,
  CardBody,
  Card
} from "reactstrap";
import "../../containers/DefaultLayout/DefaultHeader.css";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    [theme.breakpoints.up(992)]: {
      display: "none"
    }
  },
  menuButton: {
    marginRight: theme.spacing(0)
  },
  title: {
    color: "orange"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    },
    backgroundColor: "black"
  },
  inputRoot: {
    color: "inherit"
  },
  //   inputInput: {
  //     padding: theme.spacing(1, 1, 1, 7),
  //     transition: theme.transitions.create("width"),
  //     width: "100%",
  //     [theme.breakpoints.up("md")]: {
  //       width: 200
  //     }
  //   },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "block"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("xs")]: {
      display: "none"
    }
  }
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

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
        if (props.user) {
          props.setUser(null);
          props.setUserImg(null);
        }
      }
    }
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/profile"}>Profile</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/favorites"}>Favorites</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/compose"}>Compose</Link>
      </MenuItem>
      {props.user ? (
        <MenuItem onClick={handleMenuClose}>
          <Link onClick={() => logout()} to={"/login"}>
            Logout
          </Link>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMenuClose}>
          <Link onClick={() => logout()} to={"/login"}>
            Login
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="black"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const clickHandler = () => {
    props.setSidebarOpen(!props.sidebarOpen);
  };

  return (
    <>
      <div className={classes.grow}>
        <AppBar
          position="fixed"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "none",
            minHeight: "45px!important"
          }}
        >
          <Toolbar variant="dense">
            {/* <AppSidebarToggler className="" display="xl" mobile> */}
            {/* <IconButton
              edge="start"
              // className={classes.menuButton}
              color="black"
              // aria-label="open drawer"
              style={{
                outline: "none",
                display: "hidden",
                color: "white"
              }}
            > */}
            {/* <MenuIcon onClick={() => clickHandler()} /> */}
            {/* <div style={{ paddingLeft: "25px" }}></div> */}
            {/* </IconButton> */}
            {/* </AppSidebarToggler> */}
            <Typography className={classes.title} variant="h6" noWrap>
              <img width="70px" src="/assets/img/logo.png"></img>
            </Typography>
            <div className={classes.grow} />
            <IconButton
              aria-label="show 4 new mails"
              color="black"
              style={{ outline: "none" }}
              onClick={toggle}
            >
              <Badge color="secondary">
                <SearchIcon style={{ transform: "rotateY(180deg)" }} />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="black"
              style={{ outline: "none" }}
            >
              {!props.userImg &&
                props.fbId &&
                localStorage.getItem("login") && (
                  <img
                    alt="profilepicture"
                    className="img-avatar"
                    src={`https://graph.facebook.com/${props.fbId}/picture?type=square`}
                  ></img>
                )}

              {props.userImg && (
                <img
                  alt="profilepicture"
                  className="img-avatar"
                  src={`https://yeeeum.s3-us-west-1.amazonaws.com/${props.userImg}`}
                ></img>
              )}

              {!props.user && (
                <img
                  alt="profilepicture"
                  className="img-avatar"
                  src="/assets/img/default-s.png"
                ></img>
              )}
            </IconButton>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="black"
                style={{ outline: "none" }}
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <SearchFormHeader
            toggle={toggle}
            returnSearchResults={props.returnSearchResults}
          />
        </ModalHeader>
        <ModalBody></ModalBody>
      </Modal>
    </>
  );
}
