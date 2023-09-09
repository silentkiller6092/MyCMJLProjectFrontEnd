import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import axios from "axios";
import nookies from "nookies";
const baseUUrl = process.env.BaseUrl;
const AlterUrl = process.env.AlterUrl;
const unauthorized = () => {
  const router = useRouter();
  const [showLogins, setShowLogin] = useState(true);

  const [showCreatAccounts, setShowCreateAccount] = useState(false);

  const showLogin = () => {
    setShowLogin(true);
    setShowCreateAccount(false);
  };

  const showCreateAccount = () => {
    setShowLogin(false);
    setShowCreateAccount(true);
  };

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    Password: "",
    name: "",
    Phone: "",
  });
  const handleSubmit = async (e, req, res) => {
    e.preventDefault();
    const seed = userData.name + userData.Phone.toString();
    let seedValue = 0;
    for (let i = 0; i < seed.length; i++) {
      seedValue += seed.charCodeAt(i);
    }
    const randomNum = seedValue % 1000000000;
    const randomString = randomNum.toString().padStart(9, "0");
    const staticData = {
      username: randomString,
      email: userData.email,
      password: userData.Password,
      Phone: userData.Phone,
      name: userData.name,
    };
    try {
      const response = await fetch(
        `http://localhost:1337/api/auth/local/register`,
        {
          method: "POST",
          credentials: "include",
          withCredentials: true,
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(staticData),
        }
      );

      if (response.ok) {
        let result = await response.json();
        console.log(result);
        setCookie({ res }, "jwt", result.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV == "production",
          maxAge: 24 * 60 * 60,
          path: "/",
        });
        window.location.href = "/";
        setShowConatienr(false);
      } else {
        const errorData = await response.json();
        console.log("Registration error:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const [loginValue, setLoginVale] = useState({
    identifier: "",
    password: "",
  });
  const loginChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginVale({
      ...loginValue,
      [name]: value,
    });
  };
  const isProduction = process.env.NODE_ENV === "production";
  const SignInForm = async (ctx, res) => {
    let login = null;
    let loginResposnse = null;
    const loginInfo = {
      identifier: loginValue.emails,
      password: loginValue.pass,
    };
    try {
      login = await fetch(`http://127.0.0.1:1337/api/auth/local`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      loginResposnse = await login.json();
      if (loginResposnse.jwt) {
        setCookie({ res }, "jwt", loginResposnse.jwt, {
          httpOnly: isProduction,
          secure: isProduction,
          maxAge: 24 * 60 * 60,
          path: "/",
        });
        window.location.href = "/";
      } else {
        alert("Incorrect Credentials: Please check your username and password");
      }
    } catch (e) {
      console.log(e);
      console.log("reslt");
      console.log(loginResposnse);
    }
  };

  return (
    <div className="bg-slate-300">
      <div className="flex justify-center ">
        <div
          className="w-full max-w-xs p-2 mt-16  "
          style={{ display: showLogins ? "block" : "none" }}
        >
          <div className="ml-2 relative  text-2xl mb-2 font-navbar font-bold ">
            Please Login to Continue !
          </div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-fit md:w-96">
            <span className=" font-desc text-2xl">Sign in</span>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-xl mt-3 mb-2"
                for="Email"
              >
                <span className="flex">
                  {" "}
                  <img src="/Images/icons/remail.svg" className="mr-2" />
                  Email
                </span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="emails"
                placeholder="@"
                onChange={(e) => loginChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-xl mb-2"
                for="password"
              >
                <span className="flex">
                  {" "}
                  <img src="/Images/icons/lock.svg" className="mr-2" />
                  Password
                </span>
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="pass"
                type="password"
                placeholder="******************"
                onChange={(e) => loginChange(e)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link href="">
                <button
                  type="button"
                  className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                  onClick={SignInForm}
                >
                  Sign in
                </button>
              </Link>
              <div className="flex">
                <Link
                  href=""
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mr-2 cursor-pointer"
                  onClick={showCreateAccount}
                >
                  Create Account
                </Link>
                <Link
                  href=""
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-3"
                >
                  Forgot Password
                </Link>
              </div>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2023 CMJL. All rights reserved.
          </p>
        </div>
        <div
          className="w-full max-w-xs p-2 "
          style={{ display: showCreatAccounts ? "block" : "none" }}
        >
          <div className="ml-2 relative  text-2xl mb-2 mt-2 font-navbar font-bold ">
            Please Sign Up & Continue !
          </div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-fit md:w-96">
            <div className="mb-4">
              <span className=" font-desc text-2xl">Sign Up</span>
              <label
                className="block text-gray-700 mb-2 text-xl mt-3"
                for="username"
              >
                <span className="flex">
                  {" "}
                  <img src="/Images/icons/user-plus.svg" className="mr-2" />
                  Name
                </span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="UserName"
                name="name"
                type="Text"
                placeholder="UserName"
                onChange={(e) => handleChange(e)}
              />

              <label
                className="block text-gray-700  mb-2 text-xl mt-2"
                for="username"
              >
                <span className="flex">
                  {" "}
                  <img src="/Images/icons/phone.svg" className="mr-2" />
                  Phone
                </span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Number"
                type="Number"
                name="Phone"
                placeholder="+91"
                onChange={(e) => handleChange(e)}
              />

              <label
                className="block text-gray-700 mb-2 text-xl mt-2"
                for="username"
              >
                <span className="flex">
                  {" "}
                  <img src="/Images/icons/remail.svg" className="mr-2" />
                  Email
                </span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Email"
                type="email"
                name="email"
                placeholder="xyz@xyz.com"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-xl mt-2 mb-2"
                for="password"
              >
                <span className="flex">
                  {" "}
                  <img src="/Images/icons/lock.svg" className="mr-2" />
                  Password
                </span>
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="Password"
                placeholder="******************"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link href="">
                <button
                  type="button"
                  className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                  onClick={handleSubmit}
                >
                  SignUP
                </button>
              </Link>
              <Link
                href=""
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                onClick={showLogin}
              >
                Login
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2023 CMJL. All rights reserved.
          </p>
        </div>
        <div className="w-full flex justify-center items-center hidden">
          <div className="md:h-52 md:w-96 w-80 h-auto text-xl text-center rounded-2xl mt-24 bg-white alertSuccess flex justify-center flex-col">
            <img src="/Images/icons/mail.svg" className="md:h-16 h-10" />
            <p>
              OTP Sent to Mail <br /> shivampandey6092@gmail.com
            </p>
            <div className="flex mx-14 text-center">
              <input
                type="text"
                id="default-input1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
              />
              <input
                type="text"
                id="default-input2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
              />
              <input
                type="text"
                id="default-input3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
              />
              <input
                type="text"
                id="default-input4"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              type="button"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mx-auto mt-2"
            >
              Submit
            </button>
            <a href="" className="mb-2">
              Resend
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default unauthorized;
