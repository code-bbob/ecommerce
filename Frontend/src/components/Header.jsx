import React, { useEffect, useState } from "react";
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
  }

  const userDetails = useSelector((state) => state.user.value);
  console.log("userdetbybest", userDetails);
  return (
    <>
    <ToastContainer/>
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
            </> ): (
              <>
              <Link
              to="/signup"
              className="flex items-center gap-2 no-underline text-white hover:text-gray-400"
            >
              <PiSignInBold />
                <span>Sign in</span>
            </Link>

              </>
            )
            }
          </li>
        </ul>
      </div>
    </div>
  </>
  );
}

export function HeaderMid() {
  const navigate = useNavigate();
  const [searched, setSearched] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const URL = "http://localhost:8000/shop/api/";
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setProducts(res.data);
        console.log("products from api", products);
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
    items.productName.toLowerCase().includes(query.toLowerCase())
  );
  const results =
    filteredProduct.length > 0 && query.length > 0 ? filteredProduct : null;
  console.log("queried filtered", results);

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
                        navigate(`/products/${product.productId}`);
                        setQuery("");
                      }}
                      key={product.id}
                      className="z-40 w-full p-2 block border-1 bg-gray-400"
                    >
                      {product.productName}
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
                  <div>
                    <ul
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
                                              className="text-gray-500 z-10	"
                                              key={k}
                                            >
                                              {product.productName}
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
