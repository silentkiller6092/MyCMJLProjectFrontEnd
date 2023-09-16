// import axios from "axios";
// import { setCookie } from "nookies";

// export default async (req, res) => {
//   console.log(req.body);
//   const data = {
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password,
//     name: req.body.name,
//     Phone: req.body.Phone,
//   };
//   console.log(JSON.stringify(data));
//   try {
//     const response = await fetch(
//       `http://localhost:1337/api/auth/local/register`,
//       {
//         method: "POST",
//         credentials: "include",
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     setCookie({ res }, "jwt", response.data.jwt, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== "development",
//       maxAge: 30 * 24 * 60 * 60,
//       path: "/",
//     });

//     res.status(200).end();
//     console.log(response);
//   } catch (e) {
//     res.status(400).send("Error ");
//   }
// };

// pages/api/example.js

// pages/api/example.js

// pages/api/example.js

export default async (req, res) => {
  const content = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.Password,
    name: req.body.name,
    Phone: req.body.Phone,
  };
  console.log(JSON.stringify(content));
  if (req.method === "POST") {
    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(content), // Send the content data
        }
      );
      if (response.ok) {
        console.log(response);
        const result = await response.json();
        setResponseData(result);
      } else {
        console.log(response);
        console.error("POST request failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  } else {
    res.status(405).end(); // Method not allowed for non-POST requests
  }
};
