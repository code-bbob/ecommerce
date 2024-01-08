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
      <div className="p-4 flex items-center justify-between">
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
  const [products, setProducts] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/shop/api/")
      .then((res) => {
        // console.log(res.data)
        setProducts(res.data);
        // console.log("this is prod", products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // const categories = [...new Set(products?.filter((product) => product.category))]; //this wont work kina bhae filter le product ko uniqueness nikalxa ra set le kaam gardaina
  const categories = [...new Set(products?.map((product) => product.category))];  //aba hami sanga unique category xa in form of array which we can map directly
  // console.log("categ", categories);
  

  return (
    <>
      <div>
        <nav 
        className="bg-black px-10">
          <ul onMouseLeave={handleMouseLeave}
          className="flex justify-between text-md text-white py-2">
            {categories.map((category, i) => {
              return (
                <>
                  <div 
>
                    <ul  onMouseEnter={() => handleMouseEnter(i)}
                    className="flex items-center gap-2">

                    
                    <li
                      key={i}
                     
                      
                      className="text-white text-lg flex items-center gap-3 cursor-pointer "
                      style={{ position: "relative" }}
                    >
                      {category}
                      {hoveredIndex === i && (
                        <div
                          className="absolute  shadow rounded-md w-fit px-4 py-2"
                          style={{ top: "36px" }}
                        >
                          <ul>
                    
                            {products
                              .filter(
                                (product) => product.category === category
                                )
                                .map((product, j) => {
                                // console.log("Filtered Product:", product);
                                return (
                                  <>
                                    <div>
                                      <h1 key={j} className=" text-red-400 mt-1 ">
                                        {product.brandName} 
                                      </h1>
                                      {
                                        products.filter((prod)=> prod.brandName === product.brandName )
                                        .map((product, k)=> (
                                          <li className="text-gray-500" key={k}>{product.productName}</li>
                                        )
                                          
                                        )
                                      }
                                    </div>
                                  </>
                                );
                              })}
                          </ul>
                        </div>
                      )}
                    </li>
                    <li><IoIosArrowDropdownCircle/></li>
                    </ul>
                  </div>
                </>
              );
            })}
          </ul>
        </nav>

        
      </div>
    </>
  );
}
