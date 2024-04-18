import React, { createRef, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Home } from "./Home";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logoutUser } from "../Redux/UserSlice";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { removeFromCart, showCart } from "../Redux/CartSlice";

export function HeaderTop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "light",
    });
    dispatch(logoutUser());
    navigate("/");
    window.location.reload();

  }

  const userDetails = useSelector((state) => state.user.value);
  // console.log("userdetbybest", userDetails);
  return (
    <>
      <ToastContainer />
      <div className="bg-black text-white flex justify-between px-3 pt-2">
        <p className="hover:text-gray-400">Customer Service: </p>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                to="/login"
                className="flex items-center gap-2 no-underline text-white hover:text-gray-400"
              >
                <FaUser />
                {userDetails ? (
                  <span>{userDetails.name}</span>
                ) : (
                  <span>My account</span>
                )}
              </Link>
            </li>
          </ul>
          <ul className="flex items-center gap-1">
            <li>
              {userDetails ? (
                <>
                
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className="flex items-center gap-2 no-underline text-white hover:text-gray-400"
                  >
                    <PiSignInBold />
                    <span>Logout</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 no-underline text-white hover:text-gray-400"
                  >
                    <PiSignInBold />
                    <span>Sign in</span>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export function HeaderMid() {

  const [cartItemsRemove, setcartItemsRemove] = useState(null);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  // console.log("cart from redux",cartItems)
  const userDetails = useSelector((state)=>state.user.value);
  const navigate = useNavigate();
  const [searched, setSearched] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("cartItems",cartItems)
  
 

  let totalPrice = 0;

  useEffect(()=>{


    cartItems?.forEach((element) => {
      totalPrice += element?.price * element?.quantity ;
    });
  },[cartItems])
    

  const URL = "http://localhost:8000/shop/api/";
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setProducts(res.data);
        // console.log("products from api", products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    navigate(`/products/search/${query}`);
  };

  function handleQuery(e) {
    setQuery(e.target.value);
    setSearched(true);
  }
  const filteredProduct = products.filter((items) =>
    items.name?.toLowerCase().includes(query.toLowerCase())
  );
  const results =
    filteredProduct.length > 0 && query.length > 0 ? filteredProduct : null;
  // console.log("queried filtered", results);


  useEffect(() => {
    if(cartItemsRemove != null || cartItemsRemove !=  undefined){
      console.log("cart items from backend after remove", cartItemsRemove);
  
      const filteredCart = cartItemsRemove ? cartItemsRemove.order_items : [];
      console.log("filtered cart items1", filteredCart);
      const updatedOrderItems = filteredCart.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
    
      console.log("filtered cart items100", updatedOrderItems);
    
      //cart ma pathauda product vith quantity pathaunu parxa product xuttai quantity xuttai esle read gardainna so tyo garne ra kati xoti order create hunxa kati products auxa tyo ni bujne
  
        dispatch(showCart(updatedOrderItems[0]));
        console.log("##########",cartItems)
      }
      else {}
  
    },[cartItemsRemove])
  
  function handleRemove(cartItems){
    
    console.log("cartitems here", cartItems)
    if(userDetails){
      {
        axios.patch(
          "http://localhost:8000/cart/api/",
          {
            order_items: [
              {
                product: cartItems.product_id,
                quantity: cartItems.quantity - 1,
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
          console.log("returned after remove",res.data);
          setcartItemsRemove(res.data);
      })
      .catch((err) => {
          console.log(err);
      });
      }
    
    }
   
  else{
      dispatch(removeFromCart(cartItems))
      const existingCartItemsJSON = localStorage.getItem("cart-items");
      const existingCartItems = existingCartItemsJSON ? JSON.parse(existingCartItemsJSON) : [];
      const indexToRemove = existingCartItems.findIndex(item => item.productId === cartItems.productId);
    
      if (indexToRemove !== -1) {
        existingCartItems.splice(indexToRemove, 1);
        localStorage.setItem("cart-items", JSON.stringify(existingCartItems));
        console.log("Removed item with productId:", cartItems.product_id);
      }  
  }
}

  return (
    <>
      <div className="p-4 flex items-center justify-between">
        <Link to="/">
          <img className="h-30 w-44" src="/digi.jpg" alt="oop" />
        </Link>
        <div className="absolute top-24 left-80">
          <div className="flex justify-between items-center border rounded-md w-80 ">
            <input
              onChange={(e) => handleQuery(e)}
              onKeyPress={handleKeyPress}
              className="outline-none w-full p-2"
              type="search"
              placeholder="Search Your Products Here"
            />
            <button onClick={handleClick}>
              <FaSearch className="bg-orange-400 h-10 w-8 p-1 hover:bg-orange-600" />
            </button>
          </div>
          {query.length > 0 && searched ? (
            results && results.length > 0 ? (
              results?.map((product) => (
                <>
                  <div className="flex flex-row bg-red-400">
                    <div 
                      onClick={() => {
                        navigate(`/products/${product.product_id}`);
                        setQuery("");
                      }}
                      key={product.product_id}
                      className="hover:cursor-pointer z-40 w-full p-2 block border-1 bg-gray-400"
                    >
                      {product.name}
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p>No Search Found</p>
            )
          ) : null}
        </div>

        <ul className="flex gap-5 font-semibold items-center">
          <Link className="no-underline text-black" to="/blog">
          <li>Blogs</li>
          </Link>
          <Link className="no-underline text-black" to="/customPc">
          <li>Build Custom PC</li>
          </Link>
          <li className="flex items-center gap-1">
            <FaRegHeart />
            My wishlist
          </li>
          <li
            onClick={() => {
              setOpen(true);
              // navigate("/checkout/carts")
            }}
            className="flex items-center gap-1 hover:cursor-pointer relative"
          >
            <span className="absolute -top-3 left-6 text-sm font-bold">
              ({cartItems.length})
            </span>
            <FaShoppingCart size={25} color="brown" className="mr-3" />
            Shopping Cart
          </li>
        </ul>

        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              Shopping cart
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                              {cartItems != undefined && (
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                  
                                  {cartItems && cartItems.map((cartItems) => {

                                  {console.log("asdasdasdasdd")

                                }
                                return (
                                  <li
                                    key={cartItems?.product_id}
                                    className="flex py-6"
                                  >
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        // src={cartItems.images[0]?.image}
                                        alt={cartItems?.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href={cartItems?.href}>
                                              {cartItems?.name}
                                            </a>
                                          </h3>
                                          <p className="ml-4">
                                            Rs. {cartItems?.price}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">
                                          Qty {cartItems?.quantity}
                                        </p>

                                        <div className="flex">
                                          <button
                                            onClick={()=>{handleRemove(cartItems)}}
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    
                                  </li>
  )})}
                              </ul>
                            </div>
                          </div>
                              )}
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>Rs. {totalPrice}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Shipping and taxes calculated at checkout.
                          </p>
                          <div className="mt-6">
                            <a
                              href="#"
                              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              Checkout
                            </a>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              or{" "}
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setOpen(false)}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}

export function HeaderBottom() {
  const navigate = useNavigate()
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
  const categories = [...new Set(products?.map((product) => product.category))]; //aba hami sanga unique category xa in form of array which we can map directly
  // console.log("categ", categories);

  return (
    <>
      <div>
        <nav className="bg-black px-10">
          <ul 
            onMouseLeave={handleMouseLeave}
            className="flex justify-between text-md text-white py-2"
          >
            {categories.map((category, i) => {
              return (
                <>
                  <div key={i}>
                    <ul key={i}
                      onMouseEnter={() => handleMouseEnter(i)}
                      className="flex items-center gap-2"
                    >
                      <li
                        key={i}
                        className=" z-10	text-white text-lg flex items-center gap-3 cursor-pointer "
                        style={{ position: "relative" }}
                      >
                        {category}
                        {hoveredIndex === i && (
                          <div
                            className=" z-10	absolute  shadow rounded-md w-fit px-4 py-2 bg-slate-300"
                            style={{ top: "36px" }}
                          >
                            <ul className="">
                              {products
                                .filter(
                                  (product) => product.category === category
                                )
                                .map((product, j) => {
                                  // console.log("Filtered Product:", product);
                                  return (
                                    <>
                                      <div className="z-10">
                                        <h1
                                          key={j}
                                          className="z-10 text-red-400 mt-1 "
                                        >
                                          {product.brandName}
                                        </h1>
                                        {products
                                          .filter(
                                            (prod) =>
                                              prod.brandName ===
                                              product.brandName
                                          )
                                          .map((product, k) => (
                                            <li
                                            onClick={()=>{navigate(`products/${product.product_id}`)}}

                                            className="text-gray-500 z-10	"
                                            key={k}
                                            >
                                              {product.name}
                                            </li>
                                            
                                          ))}
                                      </div>
                                    </>
                                  );
                                })}
                            </ul>
                          </div>
                        )}
                      </li>
                      <li>
                        <IoIosArrowDropdownCircle />
                      </li>
                    </ul>
                  </div>
                </>
              );
            })}
          </ul>
        </nav>
      </div>
      <Outlet/>
    </>
  );
}


