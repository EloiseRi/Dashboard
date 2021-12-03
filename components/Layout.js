import React from "react";
import Head from "next/head";

import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children, refreshData }) => (
  <>
    <Head>
      <title>Epitech Dashboard</title>
    </Head>
    <main id="app" className="flex flex-col h-screen justify-between">
      <NavBar refreshData={refreshData} />
      <div className="flex-grow-1 mt-5">{children}</div>
      <Footer />
    </main>
  </>
);

export default Layout;
