// import { useState } from "react";
// import authService from "../appwrite/auth"; // Import authentication service
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux"; // Redux for authentication state
// import { login } from "../store/authSlice"; // Redux action
// import { Input } from "./index";
// import { motion } from "framer-motion";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // Initialize Redux dispatch

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setError(""); // Reset errors

//   //   // Basic form validation
//   //   if (!formData.name || !formData.email || !formData.password) {
//   //     setError("All fields are required!");
//   //     return;
//   //   }

//   //   if (!/\S+@\S+\.\S+/.test(formData.email)) {
//   //     setError("Please enter a valid email address.");
//   //     return;
//   //   }

//   //   if (formData.password.length < 6) {
//   //     setError("Password must be at least 6 characters long.");
//   //     return;
//   //   }

//   //   try {
//   //     // Call authService to register user
//   //     const user = await authService.createAccount({
//   //       name: formData.name,
//   //       email: formData.email,
//   //       password: formData.password,
//   //     });

//   //     if (user) {
//   //       // Automatically log in after signup
//   //       const session = await authService.login({
//   //         email: formData.email,
//   //         password: formData.password,
//   //       });

//   //       if (session) {
//   //         // Store session and user details in localStorage
//   //         localStorage.setItem("user", JSON.stringify(user));
//   //         localStorage.setItem("token", session.$id); // Save token for auth

//   //         // Dispatch user data to Redux store
//   //         dispatch(login(user));

//   //         alert("Sign Up Successful! Redirecting to home page...");
//   //         navigate("/home"); // Redirect to home page
//   //       } else {
//   //         setError("Login failed after signup. Please try logging in.");
//   //       }
//   //     }
//   //   } catch (error) {
//   //     setError("Failed to sign up. Please try again.");
//   //     console.error(error);
//   //   }
//   // };

  
//   const create = async(data) => {
//     setError("")
//     try {
//         const userData = await authService.createAccount(data)
//         if (userData) {
//             const userData = await authService.getCurrentUser()
//             if(userData) dispatch(login(userData));
//             navigate("/")
//         }
//     } catch (error) {
//         setError(error.message)
//     } 
// }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
//       <motion.div
//         className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
//         <p className="mt-2 text-center text-base text-black/60">
//           Already have an account?&nbsp;
//           <Link
//             to="/signin"
//             className="font-medium text-primary transition-all duration-200 cursor-pointer hover:underline"
//           >
//             Sign In
//           </Link>
//         </p>

//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//         <motion.form
//           onSubmit={create}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="space-y-5">
//             <Input
//               label="Full Name"
//               placeholder="Enter your full name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             <Input
//               label="Email"
//               placeholder="Enter your email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <Input
//               label="Password"
//               placeholder="Enter your password"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             <motion.button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               Create Account
//             </motion.button>
//           </div>
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUp;
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import authService from "../appwrite/auth"
import { Link,useNavigate } from "react-router-dom"
import {login} from "../store/authSlice"
import {Button, Input} from "./index"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
// import logo from "../assets/img/logo.jpeg"

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()

  const create = async(data) => {
      setError("")
      try {
          const userData = await authService.createAccount(data)
          if (userData) {
              const userData = await authService.getCurrentUser()
              localStorage.setItem("user", JSON.stringify(userData));
              if(userData) dispatch(login(userData));
              navigate("/")
          }
      } catch (error) {
          setError(error.message)
      } 
  }

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
          <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          {/* <div className="mb-3 flex justify-center">
                  <span className="inline-block w-full max-w-[100px] ">
                      <img src={logo} alt="" className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:h-4 sm:w-4 h-8 w-8"/>
                  </span>
              </div> */}
              <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
              <p className="mt-2 text-center text-base text-black/60">
                  Already have an account?&nbsp;
                  <Link
                      to="/signin"
                      className="font-medium text-primary transition-all duration-200 hover:underline"
                  >
                      Sign In
                  </Link>
              </p>
              {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

              <form onSubmit={handleSubmit(create)}>
                  <div className='space-y-5'>
                      <Input
                      label="Full Name: "
                      placeholder="Enter your full name"
                      {...register("name", {
                          required: true,
                      })}
                      />
                      <Input
                      label="Email: "
                      placeholder="Enter your email"
                      type="email"
                      {...register("email", {
                          required: true,
                          validate: {
                              matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                              "Email address must be a valid address",
                          }
                      })}
                      />
                      <Input
                      label="Password: "
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                          required: true,})}
                      />
                      <div className="grid mt-4 text-xl font-medium hover:border-2 border-white rounded-2xl  bg-blue-400  text-white">
                      <Button type="submit" className="w-full">
                        
                          Create Account
                      </Button>
                      </div>
                      
                  </div>
              </form>
          </div>

  </div>
)
}

export default Signup