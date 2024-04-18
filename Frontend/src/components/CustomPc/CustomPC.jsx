import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const CustomPC = () => {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/shop/api/")
      .then((res) => {
        console.log(res)
        setProducts(res.data);
        console.log("!!!!!!!!!!!!!!!!!!1",products)
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });

      
      




  }, []);


  return (
    <>
      <div className="bg-blue-100 h-100vh w-full px-5 py-4" >
        <h1 className="text-black text-center font-medium ">
          Build your own Custom PC
        </h1>
        <div>
          <h3>Select Hardware</h3>
          <div className="text-center my-5">
            <ul className=" text-center grid grid-cols-2 gap-5">
              <li className="">
                <Link to="/customPc/motherboard " className="bg-gray-100 px-5 py-4 text-xl font-semibold rounded-2xl hover:scale-90 w-10">MotherBoard</Link >
              </li>
              <li className="">
                <Link  className="bg-gray-100 px-5 py-4 text-xl font-semibold rounded-2xl hover:scale-90 w-80">Processor</Link >
              </li>
              <li className="">
                <Link  className="bg-gray-100 px-5 py-4 text-xl font-semibold rounded-2xl hover:scale-90 w-80">Case</Link >
              </li>
              <li className="">
                <Link  className="bg-gray-100 px-5 py-4 text-xl font-semibold rounded-2xl hover:scale-90 w-80">Cooling Fan</Link >
              </li>
              <li className="">
                <Link  className="bg-gray-100 px-5 py-4 text-xl font-semibold rounded-2xl hover:scale-90 w-80">Memory</Link >
              </li>
              <li className="">
                <Link  className="bg-gray-100 px-5 py-4 text-xl font-semibold rounded-2xl hover:scale-90 w-80">Storage</Link >
              </li>
              <li className="">
                <Link  className="bg-gray-100 px-5 py-4 text-xl font-semibold rounded-2xl hover:scale-90 w-80">Power Supply</Link >
              </li>
              <li className="">
                <Link  className="bg-gray-100 px-5 py-4 text-xl font-semibold rounded-2xl hover:scale-90 w-80">Graphics Card</Link >
              </li>
              
            
             
            </ul>
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
};
