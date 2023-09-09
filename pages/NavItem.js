import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import nookies from "nookies";
const baseUUrl = process.env.BaseUrl;
export const NavItem = () => {
  const onpageload = () => {
    window.location.href = "/";
  };
  const smallName = (nameuser) => {
    if (!nameuser) {
      return "";
    }
    const characters = nameuser.split("");
    const limitedCharacters = characters.slice(0, 6).join("");
    const displayText =
      characters.length > 10 ? `${limitedCharacters}` : nameuser;
    return displayText;
  };
  const [datas, setData] = useState([]);
  useEffect(() => {
    const fetchData = async (context) => {
      let email = "";
      const cookies = nookies.get(context);
      const jwt = cookies.jwt;
      if (jwt) {
        try {
          const response = await fetch(`http://localhost:1337/api/users/me`, {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          });
          const jsonData = await response.json();
          email = jsonData;
          setData(email);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setData("");
      }
    };
    fetchData();
  }, []);

  const router = useRouter();

  const [menubar, setmenuebar] = useState(false);
  const menubarsmalldevice = () => {
    setmenuebar(!menubar);
  };

  const [showContainer, setShowConatienr] = useState(false);
  const openContainer = () => {
    setShowConatienr((prevState) => !prevState);
  };
  // -------------------------------------------------------------------------
  const [lengthcart, setLengthcart] = useState(0);

  useEffect(() => {
    const Valueofcart = async (ctx) => {
      const cookies = nookies.get(ctx);
      const jwt = cookies.jwt;
      if (jwt) {
        try {
          const cartdata = await fetch(
            `http://localhost:1337/api/cart-addeds?filters[email]=${datas.email}`,
            {
              headers: {
                Authorization: "Bearer " + jwt,
              },
            }
          );
          const tottalData = await cartdata.json();
          if (tottalData == null) {
            setLengthcart(0);
          } else {
            setLengthcart(tottalData.data.length);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        setLengthcart(0);
      }
    };

    Valueofcart();
  }, [datas.email]);
  const [logstatusis, setlogistatusis] = useState(false);
  useEffect(() => {
    const loginStatus = (ctx) => {
      const cookies = nookies.get(ctx);
      let valueOfCookies = cookies.jwt;
      if (valueOfCookies) {
        setlogistatusis(true);
      } else {
        setlogistatusis(false);
      }
    };

    loginStatus();
  });

  // Logout --------------------------------
  const [clickedlogout, setClickedlogout] = useState(false);
  useEffect(() => {
    if (clickedlogout) {
      const logoutButton = (ctx) => {
        const cookies = nookies.get(ctx);
        let valueOfCookies = cookies.jwt;
        if (valueOfCookies) {
          nookies.destroy(null, "jwt");
          window.location.href = "/";
          setClickedlogout(true);
        }
      };
      logoutButton();
    }
  }, [clickedlogout]);

  return (
    <div>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.0/flowbite.min.css"
        rel="stylesheet"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.0/flowbite.min.js"></script>
      <>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
          crossOrigin="anonymous"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sofia&display=swap"
          rel="stylesheet"
        />
        {/* Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
          rel="stylesheet"
        ></link>

        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n      #drops2 {\n         position: absolute;\n         right: 6.2rem;\n      }\n   ",
          }}
        />
        <title>CLML Jewellers</title>
        <div className="header bg-customPink h-36 relative topNavbarItem">
          <div className="topnavbar ">
            <div className="flex justify-between pt-3">
              <div className="flex ml-3">
                <span
                  onClick={menubarsmalldevice}
                  style={{ display: menubar ? "none" : "block" }}
                >
                  <img
                    src="/Images/icons/menu (1).svg"
                    alt=""
                    srcSet=""
                    className="block lg:hidden h-10"
                    id="openmenuButton"
                  />
                </span>

                <img
                  src="/Images/logo.png"
                  className="ml-2 h-12"
                  alt=""
                  srcSet=""
                />
              </div>
              <div className="w-[60%] hidden lg:block relative">
                <input
                  type="text"
                  className="text w-full rounded-md pl-10 h-12 md:h-11 lg:h-11 text-xl sm:text-sm text-left"
                  placeholder="Search for Gold, Diamond.."
                />
                <div className="bg-yellow-500 rounded-md absolute inset-y-0 right-0 h-[3rem] w-14 flex items-center justify-center cursor-pointer">
                  <span className="material-symbols-outlined text-black text-3xl">
                    search
                  </span>
                </div>
              </div>
              <div className="mr-4 mt-2 lg:mr-8 flex justify-between items-center w-24">
                <Link href="/unauthorized">
                  <div
                    className=" flex items-center justify-between text-white"
                    style={{ display: logstatusis ? "none" : "block" }}
                  >
                    <span class="material-symbols-outlined">login </span> <br />{" "}
                    <span className="text-center">Sign in</span>
                  </div>
                </Link>

                <span style={{ display: logstatusis ? "block" : "none" }}>
                  <img
                    onClick={openContainer}
                    src="/Images/icons/user.svg"
                    alt=""
                    className="cursor-pointer h-8 font-bold"
                    data-tooltip-target="tooltip-account"
                    data-tooltip-trigger="hover"
                    type="img"
                    style={{ display: showContainer ? "none" : "block" }}
                  />
                  <img
                    onClick={openContainer}
                    src="/Images/icons/x-circle.svg"
                    alt=""
                    className="cursor-pointer h-7 mb-1 closeButton"
                    data-tooltip-target="tooltip-account"
                    data-tooltip-trigger="hover"
                    type="img"
                    style={{ display: showContainer ? "block" : "none" }}
                  />
                </span>
                <a href="/Cart">
                  <img
                    src="/Images/icons/shopping-cart.svg"
                    alt=""
                    className="h-8"
                  />

                  <span className="cart-count absolute top-3 lg:top-3 right-4 font-extralight text-pink-500 text-sm rounded-full p-1 mr-3 cursor-pointer">
                    {lengthcart}
                  </span>
                </a>
              </div>

              <div
                className={`box-border z-50   text-white sideNavbar border-t-0 absolute right-2 h-fit md:w-auto bg-customPink transition-opacity ${
                  showContainer ? "opacity-1" : "opacity-0"
                }`}
              >
                <div>
                  <ul className="flex flex-col justify-around mt-2">
                    <li className="font-bold mx-auto">Account Details</li>
                    <li className="mt-3 ml-2 flex ">
                      <img src="/Images/icons/corner-down-right.svg" />
                      Your Account
                    </li>
                    <li className="mt-3 ml-2 flex">
                      <img src="/Images/icons/corner-down-right.svg" />
                      Your Orders
                    </li>
                    <li className="mt-3 ml-2 flex">
                      <img src="/Images/icons/corner-down-right.svg" />
                      Your Address
                    </li>
                    <li className="mt-3 ml-2 flex">
                      <img src="/Images/icons/corner-down-right.svg" />
                      Payment Details
                    </li>
                    <li className="mt-3 ml-2 flex">
                      <img src="/Images/icons/corner-down-right.svg" />
                      Help & Support
                    </li>
                  </ul>
                </div>
                <p className="text-center flex justify-center text-gray-500 text-xs">
                  &copy;2023 CMJL. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          <div className="searchbox flex justify-around text-black lg:hidden mt-2 lg:mt-0">
            <div className="relative w-[80%] mt-2">
              <input
                type="text"
                className="text w-full rounded-md pl-10 h-9 md:h-11 lg:h-11 text-xs sm:text-sm text-left"
                placeholder="Search for Gold, Diamond.."
              />
              <div className="bg-yellow-500 rounded-md absolute inset-y-0 right-0 flex items-center justify-center w-14 cursor-pointer">
                <span className="material-symbols-outlined text-black text-4xl text-center">
                  search
                </span>
              </div>
            </div>
          </div>
          {/* Large device  */}
          <div className="hidden lg:block mt-[2rem] mx-8">
            <ul className="flex justify-evenly text-white">
              <li
                className="cursor-pointer font-navbar text-xl flex text-yellow-400"
                style={{ display: logstatusis ? "block" : "none" }}
              >
                Hii {smallName(datas.name)}{" "}
              </li>
              <Link href="/" className="no-underline hover:no-underline">
                <li
                  className="cursor-pointer font-navbar text-xl flex"
                  onClick={onpageload}
                >
                  <img src="/Images/icons/home.svg" className="h-6 mr-2" />
                  Home
                </li>
              </Link>
              <li>
                <div className="btn-group  font-navbar text-xl ">
                  <button
                    type="button"
                    className="dropdown-toggle text-white "
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="/Images/icons/droplet.svg"
                      className="h-6 mr-2 inline-grid -mt-1"
                    />
                    <span className="text-xl">Gold</span>
                  </button>
                  <div
                    className="dropdown-menu mt-[0.71rem]  text-white Gold22KT ml-10"
                    style={{ backgroundColor: "#121212" }}
                  >
                    <a
                      className="dropdown-item  text-white text-center"
                      href={`/Category/Gold 22KT`}
                      value="Gold 22KT"
                    >
                      22KT
                    </a>
                    <a
                      className="dropdown-item text-white text-center"
                      href={`/Category/Gold 18KT`}
                      value="Gold 18KT"
                    >
                      18KT
                    </a>
                    <a
                      className="dropdown-item text-white text-center"
                      href={`/Category/Gold 16KT`}
                      value="Gold 16KT"
                    >
                      16KT
                    </a>
                  </div>
                </div>
              </li>

              <li>
                <div className="btn-group  font-navbar text-xl">
                  <button
                    type="button"
                    className="dropdown-toggle text-white "
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="/Images/icons/dmnd.svg"
                      className="h-6 mr-2 inline-grid -mt-1"
                    />
                    <span className="text-xl">Diamond</span>
                  </button>
                  <div
                    className="dropdown-menu ml-10 mt-[0.71rem]  text-white Gold22KT"
                    style={{ backgroundColor: "#121212" }}
                  >
                    <a
                      className="dropdown-item text-white text-center"
                      href={`/Category/Diamond 18KT`}
                      value="Diamond 18KT"
                    >
                      18KT
                    </a>
                    <a
                      className="dropdown-item text-white text-center"
                      href={`/Category/Diamond 16KT`}
                      value="Diamond 16KT"
                    >
                      16KT
                    </a>
                  </div>
                </div>
              </li>

              <li className="cursor-pointer font-navbar text-xl flex">
                <img src="/Images/icons/gift.svg" className="h-6 mr-2" />
                Giftings
              </li>
              <li className="cursor-pointer font-navbar text-xl flex">
                <img src="/Images/icons/plus-circle.svg" className="h-6 mr-2" />
                More
              </li>
              <Link href="/AboutUs">
                <li className="cursor-pointer font-navbar text-xl flex">
                  <img src="/Images/icons/users.svg" className="h-6 mr-2" />
                  About Us
                </li>
              </Link>
              <Link href="">
                <li
                  className="cursor-pointer font-navbar text-xl flex flex-col"
                  style={{ display: logstatusis ? "block" : "none" }}
                  onClick={() => setClickedlogout(true)}
                >
                  <span className="flex">
                    <img src="/Images/icons/power.svg" className="h-6 mr-2" />
                    Logout
                  </span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        {/* -----------------------------------------------------no chnage need --------------------------------------------- */}
        <div className="lg:hidden flex flex-col overflow-scroll">
          <ul
            className="flex flex-col h-full space-x-4 text-white animate-slide-left max-h-screen w-[12rem] fixed overflow-scroll z-50 top-0"
            style={{
              backgroundColor: "#121212",
              display: menubar ? "block" : "none",
            }}
          >
            <li className="border-b-2">
              <div className="text-white pt-[1.4rem] ml-2 mr-3 text-center">
                <h3 className="mt-1 flex justify-between">
                  <span
                    className="font-navbar font-thin text-xl"
                    style={{ display: logstatusis ? "block" : "none" }}
                  >
                    Hi {smallName(datas.name)}{" "}
                  </span>

                  <img
                    src="/Images/icons/x.svg"
                    className="h-6"
                    alt=""
                    srcSet=""
                    style={{ display: menubar ? "block" : "none" }}
                    onClick={menubarsmalldevice}
                  />
                </h3>
              </div>
              <div className="mt-3  pb-2  mr-3 flex justify-center">
                <img
                  src="/Images/bottomcontent.png"
                  className="h-[4rem]"
                  srcSet=""
                />
              </div>
            </li>
            <Link href="/">
              <li
                className="cursor-pointer font-navbar text-xl flex mt-[3rem]"
                onClick={menubarsmalldevice}
                style={{
                  display: menubar ? "block" : "none",
                  display: "inline-flex",
                }}
              >
                <img src="/Images/icons/home.svg" className="h-6 mr-2" />
                Home
              </li>
            </Link>
            <li>
              <div className="btn-group  font-navbar text-xl mt-[3rem]">
                <button
                  type="button"
                  className="dropdown-toggle text-white "
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/Images/icons/droplet.svg"
                    className="h-6 mr-2 inline-grid -mt-1 "
                  />
                  <span className="text-xl">Gold</span>
                </button>
                <div
                  className="dropdown-menu mt-[0.71rem]  text-white"
                  style={{ backgroundColor: "#121212" }}
                >
                  <a
                    className="dropdown-item text-white ml-6 pl-11"
                    href={`/Category/Gold 22KT`}
                    value="Gold 22KT"
                  >
                    22KT
                  </a>
                  <a
                    className="dropdown-item text-white ml-6 pl-11"
                    href={`/Category/Gold 20KT`}
                    value="Gold 20KT"
                  >
                    20KT
                  </a>
                  <a
                    className="dropdown-item text-white ml-6 pl-11"
                    href={`/Category/Gold 18KT`}
                    value="Gold 18KT"
                  >
                    18KT
                  </a>
                </div>
              </div>
            </li>

            <li>
              <div className="btn-group  font-navbar text-xl mt-[3rem]">
                <button
                  type="button"
                  className="dropdown-toggle text-white "
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/Images/icons/dmnd.svg"
                    className="h-6 mr-2 inline-grid -mt-1"
                  />
                  <span className="text-xl">Diamond</span>
                </button>
                <div
                  className="dropdown-menu ml-6 mt-[0.71rem]  text-white"
                  style={{ backgroundColor: "#121212" }}
                >
                  <a
                    className="dropdown-item text-white ml-6 pl-11"
                    href={`/Category/Diamond 18KT`}
                    value="Diamond 18KT"
                  >
                    18KT
                  </a>
                  <a
                    className="dropdown-item text-white ml-6 pl-11"
                    href={`/Category/Diamond 16KT`}
                    value="Diamond 16KT"
                  >
                    14KT
                  </a>
                </div>
              </div>
            </li>
            <li className="cursor-pointer font-navbar text-xl flex  mt-[3rem]">
              <img src="/Images/icons/gift.svg" className="h-6 mr-2" />
              Giftings
            </li>
            <li className="cursor-pointer font-navbar text-xl flex mt-[3rem]">
              <img src="/Images/icons/plus-circle.svg" className="h-6 mr-2" />
              More
            </li>
            <Link href="/AboutUs">
              <li className="cursor-pointer font-navbar text-xl aboutUs  flex mt-[3rem]">
                <img src="/Images/icons/users.svg" className="h-6 ml-3" />
                About Us
              </li>
            </Link>
            <Link href="">
              <li
                className="cursor-pointer font-navbar text-xl flex mt-[3rem]"
                style={{ display: logstatusis ? "block" : "none" }}
                onClick={() => setClickedlogout(true)}
              >
                <img src="/Images/icons/power.svg" className="h-6 mr-2" />
                Logout
              </li>
            </Link>
          </ul>
        </div>

        {/* Small device ends here */}
      </>
      <script
        src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
};

export default NavItem;
