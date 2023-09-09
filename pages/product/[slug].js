import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import nookies from "nookies";
import { setCookie } from "nookies";
const baseUUrl = process.env.BaseUrl;
const checkout = ({ products, categories, userCredential, reviewData }) => {
  const router = useRouter();

  const limitedDescriptions = (description) => {
    const words = description.split(" ");
    const limitedWords = words.slice(0, 9).join(" ");
    const displayText = words.length > 10 ? `${limitedWords}` : description;
    return displayText;
  };
  const [openImage, setOpenImage] = useState(null);
  const OpenImage = (imgSrc) => {
    setOpenImage(imgSrc);
  };

  const [data, setdata] = useState({});
  const [status, setstatus] = useState(null);
  const [alertshow, setalertshow] = useState(false);
  const cartAdded = (context) => {
    const cookies = nookies.get(context);
    const jwt = cookies.jwt;
    const productData = {
      email: userCredential.email,
      id: products.data[0].attributes.id,
      Title: products.data[0].attributes.Title,
      Price: products.data[0].attributes.Price,
      slug: products.data[0].attributes.slug,
      Description: limitedDescriptions(products.data[0].attributes.Description),
      ImageUrl:
        "http://localhost:1337" +
        products.data[0].attributes.Images.data[0].attributes.formats.large.url,
    };
    setdata(productData);

    let url = `http://localhost:1337/api/cart-addeds`;
    fetch(url, {
      method: "POST",

      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ data: productData }),
    }).then((response) => {
      if (response.status == 200) {
        setstatus("Addded to cart");
        window.location.reload();
        setalertshow(true);
      } else {
        router.push("/unauthorized");
      }
    });
  };
  useEffect(() => {}, [data]);

  const OrderPage = (ctx, res) => {
    const cookies = nookies.get(ctx);
    const jwt = cookies.jwt;
    if (jwt) {
      nookies.destroy(null, "slug");
      setCookie({ res }, "c_val_nill_das", btoa(router.query.slug), {
        httpOnly: process.env.NODE_ENV == "production",
        secure: process.env.NODE_ENV == "production",
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      router.push("/Order");
    } else {
      router.push("/unauthorized");
    }
  };

  const [reviewValue, setreviewVale] = useState({
    UserName: "",
    Phone: "",
    Product_Review: "",
  });
  const reviewAdd = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setreviewVale({
      ...reviewValue,
      [name]: value,
    });
  };

  const addReviws = async (ctx) => {
    const cookies = nookies.get(ctx);
    const jwt = cookies.jwt;
    const reviewData = {
      UserName: userCredential.name,
      email: userCredential.email,
      Product_Review: reviewValue.Review,
    };
    if (jwt) {
      const response = fetch("http://127.0.0.1:1337/api/reviews", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ data: reviewData }),
      });
      window.location.reload();
    } else {
      window.location.href = "/unauthorized";
    }
  };
  return (
    <div className="bg-white">
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
        style={{ display: alertshow ? "block" : "none" }}
      >
        <strong>{products.data[0].attributes.Title}</strong>
        {status}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      {products.data.map((item, index) => {
        return (
          <div>
            <div
              className="flex justify-evenly flex-col md:flex-row mx-2 "
              key={index}
            >
              <div className="z-10 relative">
                <div className="max-w-2xl m-auto carusalImages">
                  <div
                    id="default-carousel"
                    className="relative mb-4 mt-4 md:ml-4"
                    data-carousel="static"
                  >
                    <div className="overflow-hidden relative mt-20 h-96 rounded-lg sm:h-screen sm:max-w-2xl xl:h-90 2xl:h-96 cursor-pointer">
                      {item.attributes.Images.data.map((image, index) => (
                        <div
                          className="hidden duration-700 ease-in-out"
                          data-carousel-item
                          key={index}
                        >
                          <img
                            src={`${baseUUrl}${
                              image.attributes.formats.large?.url ||
                              image.attributes.formats.thumbnail.url
                            }`}
                            className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 object-center shadow-sm"
                            alt="..."
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                      data-carousel-prev
                    >
                      <span className="inline-flex justify-center items-center w-4 h-4 rounded-full sm:w-10 sm:h-10 bg-gray-600 dark:bg-gray-800/30  dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-slate-500 dark:group-focus:ring-gray-800/7 dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                          className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          ></path>
                        </svg>
                        <span className="hidden">Previous</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                      data-carousel-next
                    >
                      <span className="inline-flex justify-center items-center w-4 h-4 rounded-full sm:w-10 sm:h-10 bg-gray-600 dark:bg-gray-800/30  dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-slate-500 dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                          className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                        <span className="hidden">Next</span>
                      </span>
                    </button>
                    <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                      {item.attributes.Images.data.map((_, index) => (
                        <div key={index}>
                          <button
                            type="button"
                            className="w-3 h-3 rounded-full"
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                            data-carousel-slide-to={index}
                          ></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="ml-4 opacity-0">
                  This carousel component is part of the{" "}
                  <a
                    className="text-blue-600 hover:underline"
                    href="https://flowbite.com/docs/components/carousel/"
                    target="_blank"
                  >
                    Flowbite component library.
                  </a>
                </p>
                <div>
                  <div className="overflow-x-scroll overflow-y-hidden md:w-[40vw] no-scrollbar border-b-4 mx-auto py-2 carusalimg">
                    <div className="flex">
                      {item.attributes.Images.data.map((image, index) => (
                        <div
                          className="flex-shrink-0 z-50 relative mx-auto"
                          key={index}
                        >
                          <img
                            src={`${baseUUrl}${
                              image.attributes.formats.large?.url ||
                              image.attributes.formats.thumbnail.url
                            }`}
                            alt="Nature"
                            className="cursor-pointer opacity-80 hover:opacity-100 h-16 w-16 mx-auto rounded-md shadow-md"
                            onClick={() =>
                              OpenImage(
                                `${baseUUrl}${
                                  image.attributes.formats.large?.url ||
                                  image.attributes.formats.thumbnail.url
                                }`
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                    {openImage && (
                      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-75 bigImages duration-1000 animate-slide-left smallImages">
                        <img
                          src={openImage}
                          alt="Opened"
                          className="max-h-full max-w-full mx-4 my-4 duration-1000"
                        />
                        <span className="cross absolute  top-0 cursor-pointer  bg-slate-200 rounded-full duration-500">
                          <img
                            src="/Images/icons/x-circle.svg"
                            className=""
                            onClick={() => setOpenImage(null)}
                          />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="desc md:w-[25rem] my-10 mx-2 ml-2">
                <Link href="/">Chedi Laal Munna Laal Jwellers</Link>
                <br />
                <span className="text-2xl font-bold font-navbar">
                  {item.attributes.Title}
                </span>
                <p className="text-[15px] font-navbar font-bold border-b-2 mt-2 pb-2">
                  {item.attributes.Description}
                </p>
                <p className="text-xl font-navbar font-bold border-b-2 mt-2 pb-2">
                  ₹{item.attributes.Price} <br />
                  <span>Inclusive of all taxes</span>
                </p>
                <div className="flex justify-between w-80 mx-auto text-blue-600">
                  <span className="cursor-pointer hover:scale-125 duration-300 text-center">
                    <img src="/Images/cmjlDeleverd.png" className="h-12" />
                    <p className="text-xs">Top Brand</p>
                  </span>
                  <span className="cursor-pointer hover:scale-125 duration-300 text-center">
                    <img
                      src="/Images/Secure-payment._CB650126890_.png"
                      className="h-12"
                    />
                    <p className="text-xs">
                      CMJL <br />
                      Deliverd
                    </p>
                  </span>
                  <span className="cursor-pointer hover:scale-125 duration-300 text-center">
                    <img src="/Images/topbrandLogo.png" className="h-12" />
                    <p className="text-xs">
                      Secure <br />
                      transition
                    </p>
                  </span>
                  <span className="cursor-pointer hover:scale-125 duration-300 text-center">
                    <img src="/Images/payonDelvery.png" className="h-12" />
                    <p className="text-xs">
                      Pay On
                      <br />
                      Delevery
                    </p>
                  </span>
                </div>
                <div className="text-[15px] font-navbar border-t-2 pt-2">
                  <p className="leading-3">
                    <span className="font-bold font-desc p-2">Category :</span>
                    <span className="font-bold font-desc">
                      {item.attributes.Category}
                    </span>
                  </p>
                  <p className="leading-3">
                    <span className="font-bold font-desc p-2"> Size :</span>
                    <span className="font-bold"></span>
                  </p>
                  <p className="leading-3">
                    <span className="font-bold font-desc p-2">Avilable :</span>
                    <span className=" font-desc">
                      {item.attributes.AvilableQty}
                    </span>
                  </p>
                  <p className="leading-3 text-justify">
                    <span className="font-bold font-desc p-2">
                      Perfect Gift
                    </span>
                    :
                    <span className=" font-desc text-sm">
                      {item.attributes.Gift}
                    </span>
                  </p>
                  <p className="leading-3 text-justify">
                    <span className="font-bold font-desc p-2">Usage:</span>
                    <span className="font-desc text-sm">
                      {item.attributes.Usage}
                    </span>
                  </p>
                  <p className="leading-3 text-justify">
                    <span className="font-bold font-desc p-2">Precaution:</span>
                    <span className="font-desc text-sm">
                      {item.attributes.Precaution}
                    </span>
                  </p>
                </div>
                <div className="flex justify-evenly ">
                  <button
                    className="bg-orange-600 font-buttons hover:bg-orange-400 text-white font-bold py-2 px-6 rounded-full"
                    onClick={cartAdded}
                  >
                    <span className="flex justify-between">
                      <span class="material-symbols-outlined">
                        shopping_cart_checkout
                      </span>{" "}
                      Add to Carts
                    </span>
                  </button>

                  <button
                    className="bg-yellow-500 font-buttons hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
                    onClick={OrderPage}
                  >
                    <span className="flex justify-between">
                      <span class="material-symbols-outlined">storefront</span>
                      Buy Now
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Correct  */}
            <div>
              <h3 className="text-center font-desc text-2xl font-bold border-t-2">
                Check this as Well
              </h3>
              <section className="text-gray-600 body-font overflow-y-hidden overflow-x-scroll no-scrollbar ">
                <div className="py-2">
                  <div className="flex flex-wrap justify-center">
                    {categories.data.map((item, index) => (
                      <div key={index}>
                        <a
                          href={`/product/${item.attributes.slug}`}
                          className="no-underline hover:no-underline"
                        >
                          <div
                            className="lg:w-56 w-[48vw] md:w-64 no-underline hover:no-underline "
                            key={`product-${item.attributes.slug}-${index}`}
                          >
                            <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                              <img
                                className="lg:h-60 md:h-72 w-full h-72 object-cover"
                                src={`${baseUUrl}${products.data[0].attributes.Images.data[0].attributes.formats.large.url}`}
                                alt="blog"
                              />
                              <div className="p-1 bg-slate-100">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"></h2>
                                <h1 className="title-font text-lg font-medium text-gray-700 ">
                                  {item.attributes.Category}
                                </h1>
                                <div className="flex justify-between">
                                  <h1 className="title-font text-lg font-medium text-gray-900 ">
                                    {item.attributes.Title}
                                  </h1>
                                </div>
                                <p className="text-[3vw] md:text-sm h-10 leading-6">
                                  {limitedDescriptions(
                                    item.attributes.Description
                                  )}
                                </p>
                                <div className="flex justify-between">
                                  <div>
                                    <p className="text-xl font-bold text-black font-navbar">
                                      ₹ {item.attributes.Price}
                                    </p>
                                    <p className="text-black font-navbar -mt-3">
                                      Available {item.attributes.AvilableQty}
                                    </p>
                                  </div>
                                  <img
                                    src="/Images/logo.png"
                                    className="h-12"
                                  />
                                </div>
                              </div>
                            </div>
                            <div></div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* For Review section */}
            <div className="flex flex-col md:flex-row border-t-2 ">
              <div className="basis-2/5 ">
                <div className="mx-4 py-3">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white text-center"
                  >
                    Write a Product Review
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="block h-44 p-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                    name="Review"
                    onChange={(e) => reviewAdd(e)}
                  ></textarea>
                  <button
                    type="button"
                    className=" w-full my-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    onClick={addReviws}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="basis-3/5 bg-white mx-4 py-3">
                <label
                  htmlFor="message"
                  className="block text-xl font-medium text-gray-900 dark:text-white text-center"
                >
                  Customer Reviews
                </label>
                {reviewData.data.map((item, key) => {
                  if (item) {
                    return (
                      <div className="border-b-2 py-3" key={key}>
                        <div className="username flex  ">
                          <img
                            src="/Images/icons/userb.svg"
                            className="bg-gray-300 rounded-full h-8"
                          />
                          <span className="mx-3 my-1 font-heading font-bold">
                            {item.attributes.UserName}
                          </span>
                        </div>
                        <span className="py-2 font-semibold">
                          Submitted At{" "}
                          {item.attributes.publishedAt.substring(0, 10)}
                        </span>
                        <br />
                        <span className="text-justify">
                          {item.attributes.Product_Review}
                        </span>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const jwt = cookies.jwt;

  const reviewsUrl = await fetch("http://127.0.0.1:1337/api/reviews");
  const reviewData = await reviewsUrl.json();

  let userDetails = await fetch(`${baseUUrl}/api/users/me`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
  let userCredentials = await userDetails.json();

  const productUrl = new URL(
    `${baseUUrl}/api/products?filters[slug]=` +
      context.query.slug +
      "&populate=*"
  );
  let product = await fetch(productUrl.toString());
  let data = await product.json();
  let Categorys = data.data[0].attributes.Category;
  let CategoryProduct = await fetch(
    `${baseUUrl}/api/products?filters[Category]=` + Categorys + "&populate=*"
  );
  let Catdata = await CategoryProduct.json();
  return {
    props: {
      products: data,
      categories: Catdata,
      userCredential: userCredentials,
      reviewData: reviewData,
    },
  };
}

export default checkout;
