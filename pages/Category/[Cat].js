import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const baseUUrl = process.env.BaseUrl
const checkout = ({ products }) => {

  const router = useRouter();

  const limitedDescriptions = (description) => {
    const words = description.split(" ");
    const limitedWords = words.slice(0, 9).join(" ");
    const displayText = words.length > 10 ? `${limitedWords}` : description;
    return displayText;
  };
  return(
    <section className="text-gray-600 body-font">
    <div className="py-2">
      <div className="flex flex-wrap justify-center">
        {products.data.map((item, index) => (
          
          <a
            href={`/product/${item.attributes.slug}`}
            className="no-underline hover:no-underline"
            key={index}
          >
     
            <div
              className="lg:w-56 w-[48vw] md:w-64 no-underline hover:no-underline "
              key={index}
            >
              <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"  key={index}>
               
<img
                    className="lg:h-60 md:h-72 w-full h-72 object-cover"
                    src={`${
                      baseUUrl + item.attributes.Images.data[0].attributes.formats.large.url || item.attributes.Images.data[0].attributes.formats.thumbnail.url
                    }`}
                    alt="blog"
                  />
                <div className="p-1 bg-slate-100"  key={index}>
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"></h2>
                  <h1 className="title-font text-lg font-medium text-gray-700 ">
                    {item.attributes.Category}
                  </h1>
                  <div className="flex justify-between">
                    <h1 className="title-font text-lg font-medium text-gray-900 ">
                      {item.attributes.Title}
                    </h1>
                   
                  </div>
                  <p className=" text-[3vw] md:text-sm h-10 leading-6">
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
          </a>
        ))}
      </div>
    </div>
  </section>
  )
};

export async function getServerSideProps(context) {
  const category = context.query.Cat; // Use Cat from query parameter
  const productUrl =(
    baseUUrl+"/api/products?filters[Category]="+category+"&populate=*"
  );
  let product = await fetch(productUrl);
  let data = await product.json();
  return {
    props: { products: data },
  };
}

export default checkout;
