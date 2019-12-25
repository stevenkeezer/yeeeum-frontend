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
import DefaultHeader from "../../../containers/DefaultLayout/DefaultHeader";
import RecipeCard from "../../../components/RecipeCard/RecipeCard";
import "./Extractor.css";

export default function Extractor(props) {
  const [key, setKey] = useState("home");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async query => {
    const response = await fetch(
      process.env.REACT_APP_BURL + `posts?category=${query}`,
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

  return (
    <div>
      {" "}
      <AppHeader fixed display="xl">
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => this.signOut(e)} props={props} />
        </Suspense>
      </AppHeader>
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
                    <RecipeCard recipes={recipes} setRecipes={setRecipes} />
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
    </div>
  );
}
