import { useEffect, useState } from "react";
import About from ".";
import "../styles/globals.css";
import Footer from "./components/Footer";
import NextNProgress from "nextjs-progressbar";
import { NavItem } from "./NavItem";
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavItem />
      <NextNProgress />
      <Component {...pageProps} />

      <Footer />
    </div>
  );
}

export default MyApp;
