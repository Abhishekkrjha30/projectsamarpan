/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { logout } from "../store/authSlice"

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }


  return (
    <button className="inline-block  py-2 duration-200 text-lg " onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn