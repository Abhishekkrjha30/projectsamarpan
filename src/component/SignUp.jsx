

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