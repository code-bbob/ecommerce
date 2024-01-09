import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";



export function Login(){


    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState("");

    function clickEyeButton() {
        setIsVisible((prevVisible) => !prevVisible);
      }


    function handleSubmit(e){
        e.preventDefault()

    }





    return (
        <>
        
        <div>
          <div className="w-fit m-auto my-10">
            <div className="border border-gray-400 py-10 px-10 rounded-3xl">
            <form  onSubmit={(e)=>handleSubmit(e)}
              action="#"
            >
              <p className="text-3xl font-medium text-center">Login</p>
              
              <div className="flex border items-center p-2 px-4 rounded-3xl my-4">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="enter your email address"
                  className="w-72 outline-none "
                />
                <MdAlternateEmail />
              </div>
              <div className="flex border items-center p-2 px-4 rounded-3xl my-4">
                <input
                  type={isVisible ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  required
                  className="w-72 outline-none "
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {password.length <= 0 ? (
                  <FaLock />
                ) : (
                  <button type="button" onClick={clickEyeButton}>
                    {isVisible ? <IoMdEyeOff /> : <IoMdEye />}
                  </button>
                )}
              </div>
                 
              <div className="flex justify-between">
                <label>
                  <input type="checkbox" />
                  Remember me{" "}
                </label>
                <p>Forget Password?</p>
              </div>
              <button type="submit"
               className="w-full bg-primary rounded-3xl my-4 p-2 font-bold text-white text-xl hover:bg-hover">
                Login
              </button>
              <div className="flex justify-center">
                <p>Dont have an account?</p>
                <p className="font-bold">
                  <Link to="/signup">Register</Link>
                </p>
              </div>
            </form>
            </div>
          </div>
        </div>
    
        
        </>
    )
}
export function Signup(){

    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState("");

    function clickEyeButton() {
        setIsVisible((prevVisible) => !prevVisible);
      }


    function handleSubmit(e){
        e.preventDefault()

    }



    return (
        <>
         <div>
          <div className="w-fit m-auto my-10">
            <div className="border border-gray-400 py-10 px-10 rounded-3xl">
            <form  onSubmit={(e)=>handleSubmit(e)}
              action="#"
            >
              <p className="text-3xl font-medium text-center">Signup</p>
              
              <div className="flex border items-center p-2 px-4 rounded-3xl my-4">
              <input type="username" name="username" required placeholder="enter your Username" className="w-72 outline-none" />
                <FaUser />
              </div>
              <div className="flex border items-center p-2 px-4 rounded-3xl my-4">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="enter your email address"
                  className="w-72 outline-none "
                />
                <MdAlternateEmail />
              </div>
              <div className="flex border items-center p-2 px-4 rounded-3xl my-4">
                <input
                  type={isVisible ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  required
                  className="w-72 outline-none "
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {password.length <= 0 ? (
                  <FaLock />
                ) : (
                  <button type="button" onClick={clickEyeButton}>
                    {isVisible ? <IoMdEyeOff /> : <IoMdEye />}
                  </button>
                )}
              </div>
              <div className="flex border items-center p-2 px-4 rounded-3xl my-4">
                <input
                  type="password"
                  name="repeat_password"
                  placeholder="repeat-password"
                  required
                  className="w-72 outline-none "
                  
                />
                 <FaLock />
               </div>
             
              <div className="flex flex-col items-start">
                <label
                  htmlFor="image"
                  className=" px-3"
                >
                  Add Profile Picture:
                </label>
                <div className="  w-full my-3">
                  <input
                    onChange={(e) => {
                      handleImage(e);
                      //setProductData({ ...productData, images: e.target.files });
                    }}
                    name="image"
                    type="file"
                    className=" p-4 block w-full rounded-3xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                  />
                </div>
                <small className="text-red-800"></small>
              </div>
    
              <div className="flex justify-between">
                <label>
                  <input type="checkbox" />
                  Remember me{" "}
                </label>
                <p>Forget Password?</p>
              </div>
              <button type="submit"
               className="w-full bg-primary rounded-3xl my-4 p-2 font-bold text-white text-xl hover:bg-hover">
                Signup
              </button>
              <div className="flex justify-center">
                <p>Already have an account?</p>
                <p className="font-bold">
                  <Link to="/login">Login</Link>
                </p>
              </div>
            </form>
            </div>
          </div>
        </div>
    
         </>
      )
}