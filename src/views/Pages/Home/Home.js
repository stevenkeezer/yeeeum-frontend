import React, { Suspense } from "react";
import { Container } from "reactstrap";
import { AppHeader, AppSidebar, AppSidebarHeader } from "@coreui/react";
import Sidebar from "../../../views/Sidebar/Sidebar.js";
import Dashboard from "../../Dashboard/Dashboard";
import "./Home.css";

export default function home(props) {
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center"></div>
  );

  const returnSearchResults = values => {
    props.returnSearchResults(values);
  };

  return (
    <div className="app">
      <AppSidebarHeader />
      <main className="main" style={{ position: "relative" }}>
        <Container
          fluid
          style={{ backgroundImage: "linear-gradient(#fbfbfb, #ffffff)" }}
        >
          <Suspense fallback={loading()}>
            <Dashboard returnSearchResults={returnSearchResults} />
          </Suspense>
        </Container>
      </main>
    </div>
  );
}
