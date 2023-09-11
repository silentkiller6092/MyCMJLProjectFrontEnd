import Link from "next/link";
import React, { useState, useEffect } from "react";
import Carusal from "./components/Carusal";
import nookies from "nookies";
import Cookies from "js-cookie";
const baseUUrl = "http://127.0.0.1:1337";
export default function About({ products, carusaldata }) {
  const onpageload = () => {
    window.location.href = `/product/${item.attributes.slug}`;
  };

  const limitedDescriptions = (description) => {
    const words = description.split(" ");
    const limitedWords = words.slice(0, 9).join(" ");
    const displayText = words.length > 10 ? `${limitedWords}` : description;
    return displayText + "...";
  };
  return (
    <div>
      <Carusal carusalImage={carusaldata} />
      <section className="text-gray-600 body-font">
        <div className="py-2">
          <div className="flex flex-wrap items-center justify-evenly">
            {products.data.map((item, index) => (
              <Link
                href={`/product/${item.attributes.slug}`}
                className="no-underline hover:no-underline"
                key={index}
              >
                <div
                  className="lg:w-56 w-[48vw] md:w-64 no-underline hover:no-underline  mt-3"
                  key={index}
                  onClick={() =>
                    (window.location.href = `/product/${item.attributes.slug}`)
                  }
                >
                  <div
                    className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
                    key={index}
                  >
                    <img
                      className=" h-52 md:h-72 lg:h-60 w-full object-cover"
                      src={`${
                        baseUUrl +
                          item.attributes.Images.data[0].attributes.formats
                            .large.url ||
                        item.attributes.Images.data[0].attributes.formats
                          .thumbnail.url
                      }`}
                      alt="blog"
                    />
                    <div className="p-1 bg-slate-100" key={index}>
                      {/* <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"></h2> */}
                      <h1 className="title-font text-lg font-medium text-gray-700 ">
                        {item.attributes.Category}
                      </h1>
                      <div className="flex justify-between">
                        <h2 className="title-font text-lg font-medium text-gray-900 leading-3">
                          {item.attributes.Title}
                        </h2>
                      </div>
                      <p className=" text-[3.5vw] md:text-sm h-10 leading-4">
                        {limitedDescriptions(item.attributes.Description)}
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
                        <img src="/Images/logo.png" className="h-12" />
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  let carusalItem = await fetch(
    `${process.env.BASE_URL}/api/carusal-image?populate=*`
  );
  let carusaldata = await carusalItem.json();
  let products = await fetch(`${baseUUrl}/api/products?populate=*`);
  let data = await products.json();
  return {
    props: { products: data, carusaldata: carusaldata },
  };
}
