import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import axios from "axios";

export function HeaderTop() {
  return (
    <div className="bg-black text-white flex justify-between items-center p-2">
      <p>Customer Service: </p>
      <div className="flex gap-5">
        <ul className="flex items-center gap-2">
          <li>
            <FaUser />
          </li>
          <p>My account</p>
        </ul>
        <ul className="flex items-center gap-2">
          <li>
            <PiSignInBold />
          </li>
          <p>Sign in</p>
        </ul>
      </div>
    </div>
  );
}

export function HeaderMid() {
  return (
    <>
      <div className="p-5 flex items-center justify-between">
        <img className="h-30 w-44" src="./public/digi.jpg" alt="oop" />

        <div className="flex justify-between items-center border w-1/3  rounded-md ">
          <input
            className="outline-none w-full p-2"
            type="search"
            placeholder="Search Your Products Here"
          />
          <FaSearch className="bg-orange-400 h-10 w-8 p-1 hover:bg-orange-600" />
        </div>
        <ul className="flex gap-5 font-semibold items-center">
          <li>Compare</li>
          <li className="flex items-center gap-1">
            <FaRegHeart />
            My wishlist
          </li>
          <li className="flex items-center gap-1">
            <FaShoppingCart />
            Add to Cart
          </li>
        </ul>
      </div>
    </>
  );
}

export function HeaderBottom() {

  const [products, setProducts] = useState([])

  useEffect ( ()=> {

    axios.get("http://localhost:8000/shop/api/")
    .then((res)=>{
      setProducts(res.data)
      console.log(res.data)

      
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  return (
    <>
      <div>
        <nav className="bg-black">
          <ul className="flex justify-between text-md text-white px-10 py-2">
          {
            products.map((product, index)=>{
              return (

                <li key={index} className="text-white text-lg flex items-center gap-3">
                <p>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <IoIosArrowDropdownCircle/>
              </li>
                )
            })
          }
          </ul>
                   
        </nav>
        {
          products.map((category, index)=>{
            return (
              <div>
                <div>
                  <h1 key={index}>{category.subcategory.toUpperCase()}</h1>
                  {
                    products.map((sproducts, i)=>{
                      return (
                         <li className="list-none">
                          {
                            sproducts.productName
                          }
                         </li>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  );
}
