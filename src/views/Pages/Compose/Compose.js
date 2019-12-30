import React, { Fragment, Suspense } from "react";
import { AppHeader, AppSidebar, AppSidebarHeader } from "@coreui/react";
import DefaultHeader from "../../../containers/DefaultLayout/DefaultHeader";
import Upload from "./Upload";
import { AnimatePresence, motion } from "framer-motion";

import "./Compose.css";

export default function Compose(props) {
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw"
    },
    in: {
      opacity: 1,
      x: 0
    },
    out: {
      opacity: 0,
      x: "100vw",
      scale: 1
    }
  };

  const style = {
    position: "absolute",
    marginTop: "8vh",
    width: "100vw",
    marginLeft: "auto",
    marginRight: "auto"
  };

  const pageTransition = {
    type: "tween",
    transition: "linear",
    ease: "anticipate",
    duration: 0.8,
    scale: 0.8
  };
  return (
    <Fragment>
      <AppHeader fixed display="xl">
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => this.signOut(e)} props={props} />
        </Suspense>
      </AppHeader>

      <motion.div
        exit="out"
        style={style}
        animate="in"
        initial="initial"
        variants={pageVariants}
        transition={pageTransition}
      >
        <main className="main vh-100">
          <div className="col-xl-6 col-lg-9 col-sm-10 col-md-8 mb-3 mx-auto">
            <h3>Recipe Creator</h3>
          </div>

          <Upload />
        </main>
      </motion.div>
    </Fragment>
  );
}
