import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import About from ".";
import "../styles/globals.css";
import Footer from "./components/Footer";
import NextNProgress from "nextjs-progressbar";
import { NavItem } from "./NavItem";
function MyApp({ Component, pageProps, session }) {
  // console.log(session);
  return (
    <div>
      <NavItem />
      <NextNProgress />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Footer />
    </div>
  );
}

export default MyApp;
