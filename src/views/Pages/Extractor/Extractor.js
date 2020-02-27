import React, { Suspense, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppHeader } from "@coreui/react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import RecipeCard from "../../../components/RecipeCard/RecipeCard";
import { motion } from "framer-motion";
import CategorySlider from "../Compose/StepForm/CategorySlider";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Background from "../../../assets/img/browsebg.png";
import BackgroundPlate from "../../../assets/img/browsePlateBg.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import PinterestIcon from "@material-ui/icons/Pinterest";
import "./Extractor.css";

export default function Extractor(props) {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async query => {
    const response = await fetch(
      process.env.REACT_APP_BURL + `posts?category=${query || "latest"}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify()
      }
    );
    if (response.ok) {
      const data = await response.json();
      setRecipes(data);
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

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getRecipes("latest");
  }, []);

  const pageVariants = {
    initial: {
      // opacity: 0
    },
    in: {
      // opacity: 1
    },
    out: {
      // opacity: 0
    }
  };

  const style = {
    position: "relative",
    width: "100vw"
  };
  const pageTransition = {
    type: "tween",
    transition: "linear",
    ease: "anticipate",
    duration: 0.8,
    scale: 0.8
  };

  const containerStyle = {
    display: "flex",
    overflowX: "auto",
    padding: "0px"
  };

  return (
    <motion.div
      style={style}
      exit="out"
      animate="in"
      initial="initial"
      variants={pageVariants}
      transition={pageTransition}
    >
      <main className="main">
        <div
          className="text-center"
          style={{
            backgroundImage: `url(${Background}),url(${BackgroundPlate}) `,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "calc(99% + 143px) 10%, top -202px left 100px",
            height: "44vh",
            backgroundSize: "contain",
            transform: "rotateY(360deg)"
          }}
        ></div>

        <div
          style={{
            maxWidth: "980px"
          }}
          className="col-10 mx-auto"
        >
          <h1 className="browse-header pl-2 pr-2">Browse</h1>
          <div
            className="container-fluid"
            style={{
              // maxWidth: "980px",
              paddingLeft: "none",
              paddingRight: "none"
            }}
          >
            <Nav className="pl-2 mt-4" tabs>
              <NavItem className="tab-item">
                <NavLink
                  activeClassName="tab-active"
                  className={classnames(
                    { active: activeTab === "1" },
                    "tab-link"
                  )}
                  onClick={() => {
                    toggle("1");
                    getRecipes("latest");
                  }}
                >
                  Latest
                </NavLink>
              </NavItem>
              <NavItem className="tab-item">
                <NavLink
                  activeClassName="tab-active"
                  className={classnames(
                    { active: activeTab === "2" },
                    "tab-link"
                  )}
                  onClick={() => {
                    toggle("2");
                    getRecipes("popular");
                  }}
                >
                  Popular
                </NavLink>
              </NavItem>
            </Nav>
            <div className="col ">
              <div className="row mt-2">
                <div className="col-lg-6 col-12">
                  <div className="plate">
                    <img
                      className="card-img"
                      src="https://source.unsplash.com/589x590/?food"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-12 ">
                  <div className="plate pb-3">
                    <img
                      className="card-img"
                      src="https://source.unsplash.com/250x121/?food"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="plate">
                        <img
                          className="card-img"
                          src="https://source.unsplash.com/250x120/?food"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
          </div>

          <h3 className="mt-4 pb-3 pl-2 mt-5 popular-ingredient-header">
            Popular Ingredients
          </h3>
          <CategorySlider />

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <h3 className="mt-4 pb-3 pl-2 mt-5 popular-ingredient-header">
                Why not make it again?
              </h3>
              <Row>
                <Col>
                  <div class="" style={containerStyle}>
                    <RecipeCard
                      recipes={recipes}
                      setRecipes={setRecipes}
                      likeButton={likeButton}
                    />
                  </div>
                </Col>
                <PlayCircleFilledIcon
                  fontSize="large"
                  style={{
                    position: "absolute",
                    top: "210px",
                    right: "25px",
                    color: "white"
                  }}
                />
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <div class="" style={containerStyle}>
                    <RecipeCard
                      recipes={recipes}
                      getPosts={getRecipes}
                      likeButton={likeButton}
                      setRecipes={setRecipes}
                    />
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <Row>{/* <RecipeCard recipes={recipes} />; */}</Row>
                </Col>
              </Row>
            </TabPane>
          </TabContent>

          <footer
            class="page-footer font-small blue pt-4 mx-auto pl-2 pr-2"
            // style={{ maxWidth: "948px" }}
          >
            <div className="container-fluid text-center text-md-left ">
              <div
                className="browse-footer-line"
                style={{ borderBottom: "1px solid #e3e3e3" }}
              ></div>
              <div className="row" style={{ marginTop: "5.7%" }}>
                <div className="col-md-6 mt-md-0 ">
                  <ul className="list-unstyled pb-3">
                    <h5 className="text-uppercase pb-2">Company</h5>
                    <li>
                      <a href="#!" className="footer-link">
                        About Yeeeum
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="footer-link">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="footer-link">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>

                <hr className="clearfix w-100 d-md-none pb-5  mb-1"></hr>

                <div className="col-md-3 mb-md-0 mb-3">
                  <h5 className="text-uppercase pb-2">Support</h5>

                  <ul className="list-unstyled">
                    <li>
                      <Link href="#!" className="footer-link">
                        FAQ's
                      </Link>
                    </li>
                    <li>
                      <Link href="#!" className="footer-link">
                        Contact us
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-md-3 mb-md-0 mb-3">
                  <h5 className="text-uppercase pb-2">Follow us</h5>

                  <ul className="list-unstyled" color="">
                    <Link href="#!">
                      <FacebookIcon
                        style={{
                          color: "#4a4a4a",
                          fontSize: "medium",
                          marginRight: "20px"
                        }}
                      />
                    </Link>
                    <Link href="#!">
                      <YouTubeIcon
                        style={{
                          color: "#4a4a4a",
                          fontSize: "medium",
                          marginRight: "20px"
                        }}
                      />
                    </Link>
                    <Link href="#!">
                      <InstagramIcon
                        style={{
                          color: "#4a4a4a",
                          fontSize: "medium",
                          marginRight: "20px"
                        }}
                      />
                    </Link>
                    <Link href="#!">
                      <PinterestIcon
                        style={{
                          color: "#4a4a4a",
                          fontSize: "medium",
                          marginRight: "20px"
                        }}
                      />
                    </Link>
                  </ul>
                  <ul className="list-unstyled"></ul>
                </div>
              </div>
            </div>
            <div
              className="browse-footer-line pt-4"
              style={{ borderBottom: "1px solid #e3e3e3" }}
            ></div>
            <br></br>
            <div
              className="footer-copyright text-right e-3 mt-4"
              style={{ marginBottom: "14vh", color: "#bababa" }}
            >
              © 2020 Copyright:
              <span href="https://mdbootstrap.com/education/bootstrap/">
                {" "}
                Yeeeum.com
              </span>
            </div>
          </footer>
        </div>
      </main>
    </motion.div>
  );
}
