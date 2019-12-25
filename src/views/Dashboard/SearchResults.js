import React, { Suspense, useEffect, useState } from "react";
import { AppHeader, AppSidebar, AppSidebarHeader } from "@coreui/react";
import DefaultHeader from "../../containers/DefaultLayout/DefaultHeader";
import SearchForm from "./SearchForm";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

export default function SearchResults(props) {
  const returnSearchResults = values => {
    props.returnSearchResults(values);
  };

  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  return (
    <div>
      <AppHeader fixed display="xl">
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => this.signOut(e)} props={props} />
        </Suspense>
      </AppHeader>

      <main className="main">
        <div style={{ paddingTop: "30px" }}>
          <SearchForm returnSearchResults={returnSearchResults} />
        </div>
        <RecipeCard recipes={props.searchResults} />
      </main>
    </div>
  );
}
