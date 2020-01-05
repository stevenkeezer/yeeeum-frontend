import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import routes from "../../routes";

function DefaultLayout(props) {
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center"></div>
  );

  return (
    <div className="app">
      <div className="app-body">
        <main className="main" >
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
