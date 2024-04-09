import React from 'react'
import { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setToCart } from '../../Redux/CartSlice';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router';
import  axios  from 'axios';

export default function Singleproduct({prod}) {
    const [isActive, setIsActive] = useState(false);
    const userDetails = useSelector((state)=>state.user.value)
    console.log("user",userDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    function handleCart(prod){

      console.log("clicked here")
        const singleproduct = [prod]
        if(userDetails){
          const token = localStorage.getItem("token")
          // const existingCartItemsJSON = localStorage.getItem("cart-items");
          // const existingCartItems = existingCartItemsJSON ? JSON.parse(existingCartItemsJSON) : [];
          // const updatedCartItems = [...existingCartItems];
          
          axios.post("http://localhost:8000/cart/api/", {
            order_items: [
                {
                    product: prod.productId,
                    quantity: prod.quantity,
                }
            ]
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
        
          dispatch(setToCart(singleproduct))
          localStorage.removeItem("cart-items")
          toast.success(`${prod.productName} added to Cart`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
          // axios.post to post in backend with userDetails and prod details
           
          
        }
        else{
          console.log("here and",prod)
          dispatch(setToCart(singleproduct));
        const existingCartItemsJSON = localStorage.getItem("cart-items");
        const existingCartItems = existingCartItemsJSON ? JSON.parse(existingCartItemsJSON) : [];
        const updatedCartItems = [...existingCartItems,...singleproduct];
        const updatedCartItemsJSON = JSON.stringify(updatedCartItems);
        localStorage.setItem("cart-items",updatedCartItemsJSON)
    
    
    
        toast.success(`${prod.productName} added to Cart`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      }
      }


  return (
    <div>
         {
              <div onMouseEnter={() => setIsActive(true)}
              onMouseLeave={() => setIsActive(false)}
              className="bg-white text-black myCard relative"> 
             
              {/* css at app.jsx */}
                {/* image ma tyo black bg halna mildaina so we make a div for black bg and wrap image in it ra styling garera main div ma hover garda mycard ma hover huda image yo div ko height transition ma badaidine */}
                <div className="relative myImg ">
                    <div className='myDetails absolute  flex gap-1 z-100 '>
                    <div  onClick={()=> {navigate(`/products/:${prod.productId}`)}} className='hover:cursor-pointer border border-white p-1 text-white hover:bg-gray-600'>ViewDetails</div>
                    <div  onClick={()=> {handleCart(prod)}} className=' border text-white p-1 hover:bg-gray-800'><FaShoppingCart size={20}/></div> 
                    </div> 
                  <img className=" h-52 w-56 mb-3" src={prod.image} alt="" />
                </div>
                {/* tespaxi tyo div bitra kei lekhnu paryo bhane arko div banaune jun xai hover huda active hunxa ra nahuda hide hunxa so illusion banaune */}

                <p className="m-0">{prod.series}
                    {prod.productName}
                </p>
                <p>Price Nrs:{prod.price}</p>

               
              </div>
            }
    </div>
  )
}
