import 'tailwindcss/tailwind.css'
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import Navigation from '../components/Navigation.js';

const App = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Navigation {...pageProps} />
    </UserProvider>
  );
};

export default App;
