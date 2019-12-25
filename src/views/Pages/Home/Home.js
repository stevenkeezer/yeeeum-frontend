import React, { Suspense } from "react";
import { Container } from "reactstrap";
import { AppHeader, AppSidebar, AppSidebarHeader } from "@coreui/react";
import Sidebar from "../../../views/Sidebar/Sidebar.js";
import Dashboard from "../../Dashboard/Dashboard";
import "./Home.css";
const DefaultHeader = React.lazy(() =>
  import("../../../containers/DefaultLayout/DefaultHeader")
);

export default function home(props) {
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center"></div>
  );

  const returnSearchResults = values => {
    props.returnSearchResults(values);
  };

  return (
    <div className="app">
      <AppHeader fixed display="lg">
        <Suspense>
          <DefaultHeader props={props} onLogout={e => this.signOut(e)} />
        </Suspense>
      </AppHeader>

      <AppSidebarHeader />
      <main className="main">
        <Container fluid>
          <Suspense fallback={loading()}>
            <Dashboard returnSearchResults={returnSearchResults} />
          </Suspense>
        </Container>
      </main>
    </div>
  );
}
