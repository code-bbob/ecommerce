import React, { useEffect } from "react";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setToCart } from "../../Redux/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Singleproduct({ prod }) {
  const [isActive, setIsActive] = useState();
  const userDetails = useSelector((state) => state.user.value);
  // console.log("user", userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCart(prod) {

    console.log("clicked here", prod);
    const singleproduct = {...prod,quantity: 1};
    console.log("asdasdasdasd",singleproduct)
    if (userDetails) {
      const token = localStorage.getItem("token");
      // const existingCartItemsJSON = localStorage.getItem("cart-items");
      // const existingCartItems = existingCartItemsJSON ? JSON.parse(existingCartItemsJSON) : [];
      // const updatedCartItems = [...existingCartItems];

      axios.get("http://localhost:8000/cart/api/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("getting .............");
        console.log("user order value", res);
        if (res.data.length === 0) {
          console.log("FirstOrder");
          axios
            .post(
              "http://localhost:8000/cart/api/",
              {
                order_items: [
                  {
                    product: prod.product_id,
                    quantity: 1,
                  }
                ]
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              console.log("posting##############3")
              console.log("post successful.............", res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("SecondOrder");
          axios
            .patch(
              "http://localhost:8000/cart/api/",
              {
                order_items: [
                  {
                    product: prod.product_id,
                    quantity: 1,
                  },
                ],
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              console.log("patched",res);
              console.log("patching#################")
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    
      dispatch(setToCart(singleproduct));
      toast.success(`${prod.name} added to Cart`, {
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
     else {
      // console.log("here and", prod);
      dispatch(setToCart(singleproduct));
      let existingCartItemsJSON = localStorage.getItem("cart-items");
      let existingCartItems = existingCartItemsJSON ? JSON.parse(existingCartItemsJSON) : [];
      
      const matchedIndex = existingCartItems.findIndex((el) => el.product_id === singleproduct.product_id);
      
      if (matchedIndex !== -1) {
        existingCartItems[matchedIndex].quantity += singleproduct.quantity;
      } else {
        existingCartItems.push({ ...singleproduct, quantity: singleproduct.quantity });
      }
      
      const updatedCartItemsJSON = JSON.stringify(existingCartItems);
      localStorage.setItem("cart-items", updatedCartItemsJSON);
      
      console.log("Updated Cart Items:", existingCartItems);
      
      toast.success(`${singleproduct.name} added to Cart`, {
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
        <div
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          className="bg-inherit text-black myCard relative h-full"
        >
          {/* css at app.jsx */}
          {/* image ma tyo black bg halna mildaina so we make a div for black bg and wrap image in it ra styling garera main div ma hover garda mycard ma hover huda image yo div ko height transition ma badaidine */}
          <div className="relative myImg ">
            <div className="myDetails absolute  flex gap-1 z-100 ">
              <div
                onClick={() => {
                  navigate(`/products/${prod.product_id}`);
                }}
                className="hover:cursor-pointer border border-white p-1 text-white hover:bg-gray-600"
              >
                ViewDetails
              </div>
              <div
                onClick={() => {
                  handleCart(prod);
                }}
                className=" border text-white p-1 hover:bg-gray-800"
              >
                <FaShoppingCart size={20} />
              </div>
            </div>
            <img
              className=" h-52 w-full"
              src={prod.images[0]?.image}
              alt=""
            />
          </div>
          {/* tespaxi tyo div bitra kei lekhnu paryo bhane arko div banaune jun xai hover huda active hunxa ra nahuda hide hunxa so illusion banaune */}

          <p className="m-0 -mb-3 ">
            {prod.series}
            {prod.name.charAt(0).toUpperCase() + prod.name.slice(1)}
          </p>
          
          <p className="font-semibold text-green-800 capitalize text-lg">NRS {prod.price}</p>
        </div>
      }
    </div>
  );
}
