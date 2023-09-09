// import nookies from "nookies";

// const Register = ({ products }) => {
//   return (
//     <div>register</div>
//   );
// };

// export async function getServerSideProps(context) {
//   const cookies = nookies.get(context);
//   const jwt = cookies.jwt;
//   let userDetails = await fetch(
//     "http://127.0.0.1:1337/api/users/me?fields=email",
//     {
//       headers: {
//         Authorization: "Bearer " + jwt,
//       },
//     }
//   );
//   let userCredentials = await userDetails.json();

//   return {
//     props: { products: userCredentials },
//   };
// }

// export default Register;
