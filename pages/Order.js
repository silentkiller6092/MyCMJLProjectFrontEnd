import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import nookies from "nookies";
import { setCookie } from "nookies";
const Order = ({ OrderData, userCredential }) => {
  const router = useRouter();
  const [price, setPrice] = useState({
    Price: "",
    Shipping: "",
  });
  const [values, setValues] = useState({
    FullName: "",
    email: "",
    Phone: "",
    AlternatePhone: "",
    Landmark: "",
    Pincode: "",
    Village: "",
    city: "",
    State: "",
  });
  const loginChange = async (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const confirmOrder = async (ctx) => {
    try {
      const cookies = nookies.get(ctx);
      const jwt = cookies.jwt;

      if (!jwt) {
        console.error("JWT token not found in cookies");
        return;
      }

      const staticData = {
        data: {
          Productname: OrderData.data[0].attributes.Title,
          productDescription: OrderData.data[0].attributes.Description,
          username: values.FullName,
          userEmail: userCredential.email,
          orderEmail: values.email,
          phone: values.Phone,
          alternatephone: values.AlternatePhone,
          LandMark: values.Landmark,
          Pincode: values.Pincode,
          Village: values.Village,
          City: values.city,
          state: values.State,
        },
      };
      console.log(staticData);
      const response = await fetch("http://localhost:1337/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(staticData),
      });

      if (response.status === 200) {
        const res = await response.json();
        console.log(res);
      } else {
        console.error(
          "Failed to create the order. Status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <>
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-10 xl:px-10">
          <div className="px-4 pt-8">
            <p className="text-2xl font-serif">Order Summary</p>
            {OrderData.data.map((item, index) => {
              useEffect(() => {
                setPrice({
                  ...price,
                  Price: item.attributes.Price,
                  Shipping: 40,
                });
              }, []);

              return (
                <div
                  className="mt-8 space-y-3 rounded-lg bg-white px-2 py-4 sm:px-6"
                  key={index}
                >
                  <div className="flex flex-col rounded-lg bg-slate-200 mb-2 sm:flex-row">
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={`http://127.0.0.1:1337${item.attributes.Images.data[0].attributes.formats.large.url}`}
                      alt=""
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">
                        {item.attributes.Title}
                      </span>
                      <span className="float-right text-gray-400">
                        {item.attributes.Category}
                      </span>
                      <p className="text-lg font-bold">
                        ₹ {item.attributes.Price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-2xl font-serif">Contact Information</p>

            <div className="">
              <label className="text-sm text-gray-00 font-navbar font-extrabold">
                Full Name <span className="text-red-700">*</span>
              </label>
              <input
                className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded-sm"
                id="cus_name"
                name="FullName"
                type="text"
                required=""
                placeholder="Your Email"
                aria-label="Name"
                onChange={(e) => loginChange(e)}
              />

              <label className="text-sm text-gray-00 font-navbar font-extrabold">
                Email<span className="text-red-700">*</span>
              </label>
              <input
                className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded-sm"
                id="cus_name"
                name="email"
                type="text"
                required=""
                placeholder="Your Email"
                aria-label="Name"
                onChange={(e) => loginChange(e)}
              />

              <label className="text-sm text-gray-00 font-navbar font-extrabold">
                Phone <span className="text-red-700">*</span>
              </label>
              <input
                className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded-sm"
                id="cus_name"
                name="Phone"
                type="text"
                required=""
                placeholder="Your Email"
                aria-label="Name"
                onChange={(e) => loginChange(e)}
              />

              <label className="text-sm text-gray-00 font-navbar font-extrabold">
                Alternate Phone
              </label>
              <input
                className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded-sm"
                id="cus_name"
                name="AlternatePhone"
                type="text"
                required=""
                placeholder="Your Email"
                aria-label="Name"
                onChange={(e) => loginChange(e)}
              />
              <label className="text-sm text-gray-00 font-navbar font-extrabold">
                Street,Building, Landmark{" "}
                <span className="text-red-700">*</span>
              </label>
              <input
                className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded-sm"
                id="cus_name"
                name="Landmark"
                type="text"
                required=""
                placeholder="Your Email"
                aria-label="Name"
                onChange={(e) => loginChange(e)}
              />
              <span className="flex">
                <span className="mr-2 w-full">
                  <label className="text-sm text-gray-00 font-navbar font-extrabold">
                    Pincode <span className="text-red-700">*</span>
                  </label>
                  <input
                    className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded-sm"
                    id="cus_name"
                    name="Pincode"
                    type="text"
                    required=""
                    placeholder="Your Email"
                    aria-label="Name"
                    onChange={(e) => loginChange(e)}
                  />
                </span>

                <span className="w-full">
                  <label className="text-sm text-gray-00 font-navbar font-extrabold">
                    Area, Village <span className="text-red-700">*</span>
                  </label>
                  <input
                    className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded-sm"
                    id="cus_name"
                    name="Village"
                    type="text"
                    required=""
                    placeholder="Your Email"
                    aria-label="Name"
                    onChange={(e) => loginChange(e)}
                  />
                </span>
              </span>

              <span className="flex">
                <span className="mr-2 w-full">
                  <label className="text-sm text-gray-00 font-navbar font-extrabold">
                    City <span className="text-red-700">*</span>
                  </label>
                  <input
                    className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded-sm"
                    id="cus_name"
                    name="city"
                    type="text"
                    required=""
                    placeholder="Your Email"
                    aria-label="Name"
                    onChange={(e) => loginChange(e)}
                  />
                </span>

                <span className="w-full">
                  <label className="text-sm text-gray-00 font-navbar font-extrabold">
                    State <span className="text-red-700">*</span>
                  </label>
                  <input
                    className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded-sm"
                    id="cus_name"
                    name="State"
                    type="text"
                    required=""
                    placeholder="Your Email"
                    aria-label="Name"
                    onChange={(e) => loginChange(e)}
                  />
                </span>
              </span>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">₹ {price.Price}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">
                    ₹ {price.Shipping}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {" "}
                  ₹{Number(price.Price) + Number(price.Shipping)}
                </p>
              </div>
            </div>
            <Link href="">
              <button
                className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                onClick={confirmOrder}
              >
                Place Order
              </button>
            </Link>
          </div>
        </div>
      </>
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  let userDetails = await fetch(`http://127.0.0.1:1337/api/users/me`, {
    headers: {
      Authorization: "Bearer " + cookies.jwt,
    },
  });
  let userCredentials = await userDetails.json();

  let slugValue = cookies.c_val_nill_das;
  const productUrl = new URL(
    `http://127.0.0.1:1337/api/products?filters[slug]=` +
      atob(slugValue) +
      "&populate=*"
  );
  let product = await fetch(productUrl.toString());
  let data = await product.json();
  return {
    props: {
      OrderData: data,
      userCredential: userCredentials,
    },
  };
}

export default Order;
