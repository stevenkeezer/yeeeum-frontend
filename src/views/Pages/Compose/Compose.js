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
      y: "-100vh"
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: "100vh",
      scale: 1
    }
  };

  const pageTransition = {
    type: "tween",
    transition: "linear",
    ease: "anticipate",
    duration: 1,
    scale: 0.8
  };
  return (
    <Fragment>
      <AppHeader fixed display="xl">
        <Suspense fallback={loading()}>
          <DefaultHeader onLogout={e => this.signOut(e)} props={props} />
        </Suspense>
      </AppHeader>

      <main className="main">
        <motion.div
          exit="out"
          animate="in"
          initial="initial"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Upload />
        </motion.div>
      </main>
    </Fragment>
  );
}
