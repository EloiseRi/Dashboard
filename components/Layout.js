import React from "react";
import Head from "next/head";

import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => (

  <>
    <Head>
      <title>Epitech Dashboard</title>
    </Head>
    <main id="app" className="flex flex-col h-screen justify-between">
      <NavBar />
      <div className="bg-gray-100 flex-grow-1 mt-5">{children}</div>
      <Footer />
    </main>
  </>
);

export default Layout;
