import React, { useEffect, useState } from "react";
import nookies from "nookies";
import Link from "next/link";
const Cart = ({ products }) => {
  if (products.length === 0) {
    return "";
  }
  const [productsList, setProductsList] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  useEffect(() => {
    setProductsList(products.data);
  }, []);
  useEffect(() => {
    const totalPayprice = productsList.reduce((item, count) => {
      return item + count.attributes.Price;
    }, 0);
    setTotalPrice(totalPayprice);
  }, [productsList]);
  const deletCart = async (id) => {
    try {
      let response = await fetch(
        `${process.env.BASE_URL}/api/cart-addeds/` + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer 4906216a677b4cceff346b328414f2f33cc74618f33a0c4e2cc5ddd4a8f92dcc48f69a3f06c59f4d5162bb7d7e37c9c3ab802727dd194d49bc252c2e4f7ca83874219549802435146e218255ef22273a24a6cf6e2c09e1844674fd1d108a05dbcabac66a6ac68cfe53c46e09351fe3541aff815ec1d2edf169205b030c8a4491",
          },
        }
      );

      if (response.ok) {
        setProductsList([...productsList.filter((item) => item.id !== id)]);
        window.location.reload();
        console.log("Item deleted successfully");
      } else {
        // Handle error cases
        console.error("Error deleting item");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  if (productsList.length === 0) {
    return (
      <div className="emptyCart">
        <div className="w-80%  bg-slate-300 flex flex-col items-center justify-center m-4 p-10 rounded-sm pb-3 cursor-pointer">
          <div>
            <p className=" text-center font-desc z-20">
              Your cart is currently empty, but your possibilities are endless!
              Explore our collections and discover something special to fill it
              with.
            </p>
          </div>
          <div className="z-40">
            <Link href="/">
              <button
                type="button"
                className=" cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Add To Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {productsList.map((item, index) => (
        <div key={item.id}>
          <div
            className="topdiv flex w-[90%] mx-auto bg-slate-200 m-3 mb-7 justify-between flex-col  "
            key={index}
          >
            <a
              href={`/product/${item.attributes.slug}`}
              className="hover:no-underline  text-black"
            >
              <div className="flex flex-row">
                <img
                  src={`${item.attributes.ImageUrl}`}
                  className="h-32 w-28 m-2 rounded-md mt-4"
                />
                <div className="flex flex-col ml-4 mt-2">
                  <span className="font-desc font-bold  md:text-[2vw] mt-3">
                    {item.attributes.Title}
                  </span>
                  <span className="font-desc md:text-[1.5vw]">
                    {item.attributes.Description}
                  </span>
                  <span className="font-desc font-bold  md:text-[2vw] mt-2">
                    ₹ {item.attributes.Price}
                  </span>
                </div>
              </div>
            </a>
            <div className="flex mt-2 justify-evenly pb-4">
              <span className="border-2 w-28 h-7 rounded-md flex justify-between shadow-md increaseAmount">
                <span className="border-r-2 cursor-pointer">
                  <p className="text-center">
                    <span className="material-symbols-outlined">remove</span>
                  </p>
                </span>
                <span className="">
                  <p className="text-xl font-mono font-bold">1</p>
                </span>
                <span className="border-r-2 cursor-pointer add">
                  <p className="text-center">
                    <span className="material-symbols-outlined">add</span>
                  </p>
                </span>
              </span>
              <span
                className="mt-1 cursor-pointer"
                onClick={() => deletCart(item.id)}
              >
                <span className="material-symbols-outlined">delete</span>
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="cartPrice bg-slate-400 basis-1/4 h-52  flex-col">
        <div className="text-center flex flex-col">
          <span className="flex justify-center mt-4 text-white">
            <p className="font-bold font-navbar ">
              SubTotal ({productsList.length} Item)
            </p>
            <p className="font-bold font-sans"> ₹ {totalPrice} </p>
          </span>
          <span className="w-full">
            <button
              type="button"
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
            >
              ByeNow
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const jwt = cookies.jwt;

  try {
    let userDetails = await fetch(
      `${process.env.BASE_URL}/api/users/me?fields=email`,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    );

    if (
      userDetails.status === 401 ||
      userDetails.status === 403 ||
      userDetails.ok === false
    ) {
      return {
        redirect: {
          destination: "/unauthorized",
          permanent: false,
        },
      };
    }

    let userCredentials = await userDetails.json();

    let products = await fetch(
      `${process.env.BASE_URL}/api/cart-addeds?filters[email]=${userCredentials.email}`,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    );

    let data = await products.json();
    return {
      props: { products: data },
    };
  } catch (error) {
    console.error(error);
    // Handle other errors if needed
    return {
      notFound: true, // Return a 404 page
    };
  }
}

export default Cart;
