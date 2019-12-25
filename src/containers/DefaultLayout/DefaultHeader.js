import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import SearchFormHeader from "../../views/Dashboard/SearchFormHeader";

import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from "reactstrap";
import PropTypes from "prop-types";

import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";

import "./DefaultHeader.css";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

function DefaultHeader(props) {
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
        if (props.props.user) {
          props.props.setUser(null);
          props.props.setUserImg(null);
        }
      }
    }
  };
  return (
    <React.Fragment>
      <AppSidebarToggler className="" display="xl" mobile />
      <AppNavbarBrand
        href="https://localhost:3000"
        style={{ left: "50%", position: "absolute" }}
        className="logo text-center"
      >
        <img width="70px" src="/assets/img/logo.png"></img>
      </AppNavbarBrand>

      <Nav className="ml-auto" navbar>
        <NavItem className="d-md-none ">
          <SearchFormHeader
            returnSearchResults={props.props.returnSearchResults}
          />
        </NavItem>
        <UncontrolledDropdown
          direction="down"
          className="mr-4"
          style={{ paddingLeft: "0px!important" }}
        >
          <DropdownToggle nav>
            {!props.props.userImg &&
              props.props.fbId &&
              localStorage.getItem("login") && (
                <img
                  alt="profilepicture"
                  className="img-avatar"
                  src={`https://graph.facebook.com/${props.props.fbId}/picture?type=square`}
                ></img>
              )}

            {props.props.userImg && (
              <img
                alt="profilepicture"
                className="img-avatar"
                src={`https://yeeeum.s3-us-west-1.amazonaws.com/${props.props.userImg}`}
              ></img>
            )}

            {!props.props.userImg && !props.props.fbId && (
              <img
                alt="profilepicture"
                className="img-avatar"
                src="/assets/img/default-s.png"
              ></img>
            )}
          </DropdownToggle>
          <DropdownMenu right>
            {props.props.user && (
              <>
                <NavLink to={"/profile"}>
                  <DropdownItem>
                    <i className="fa fa-user"></i> Profile
                    {/* <Badge color="info">42</Badge> */}
                  </DropdownItem>
                </NavLink>{" "}
                <NavLink to={"/compose"}>
                  <DropdownItem>
                    <i className="fa fa-user"></i> Compose
                  </DropdownItem>
                </NavLink>
                <NavLink to={"/favorites"}>
                  <DropdownItem>
                    <i className="fa fa-user"></i> Favorites
                  </DropdownItem>
                </NavLink>
              </>
            )}
            {props.props.user ? (
              <NavLink onClick={() => logout()} to={"/login"}>
                <DropdownItem>
                  <i className="fa fa-lock"></i> Logout
                </DropdownItem>
              </NavLink>
            ) : (
              <NavLink onClick={() => logout()} to={"/login"}>
                <DropdownItem>
                  <i className="fa fa-lock"></i> Login
                </DropdownItem>
              </NavLink>
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </React.Fragment>
  );
}

export default DefaultHeader;
