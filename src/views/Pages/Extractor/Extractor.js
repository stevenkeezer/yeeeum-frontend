import React, { Suspense, useState, useEffect } from "react";
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
    position: "absolute",
    width: "100vw"
  };
  const pageTransition = {
    type: "tween",
    transition: "linear",
    ease: "anticipate",
    duration: 0.8,
    scale: 0.8
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
        <div className="col-11 col-xl-9 col-lg-10 mx-auto pt-5">
          <Nav className="mb-3 mt-4" tabs>
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
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Row>
                    <RecipeCard
                      recipes={recipes}
                      setRecipes={setRecipes}
                      likeButton={likeButton}
                    />
                  </Row>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <Row>
                    <RecipeCard
                      recipes={recipes}
                      getPosts={getRecipes}
                      setRecipes={setRecipes}
                    />
                  </Row>
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
        </div>
      </main>
    </motion.div>
  );
}
