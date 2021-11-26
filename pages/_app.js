import 'tailwindcss/tailwind.css'
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import Header from '../components/Header.js';

const App = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      {/* <Component {...pageProps} /> */}
      <Header {...pageProps} />
    </UserProvider>
  );
};

export default App;
