import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import { AppHeader, AppSidebar, AppSidebarHeader } from "@coreui/react";
import routes from "../../routes";
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

function DefaultLayout(props) {
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center"></div>
  );

  return (
    <div className="app">
      <AppHeader fixed display="lg">
        <Suspense>
          <DefaultHeader props={props} onLogout={e => this.signOut(e)} />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <main className="main">
          <Container fluid>
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                {/* <Redirect from="/" to="/dashboard" /> */}
              </Switch>
            </Suspense>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
