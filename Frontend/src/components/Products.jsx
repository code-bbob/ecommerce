import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToCart } from "../Redux/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const handleCart = (prod) => {
    const singleprod = [prod];

    if (userDetails) {
      // Handle cart logic with backend (axios.post)
    } else {
      dispatch(setToCart(singleprod));

      const existingCartItemsJSON = localStorage.getItem("cart-items");
      const existingCartItems = existingCartItemsJSON
        ? JSON.parse(existingCartItemsJSON)
        : [];
      const updatedCartItems = [...existingCartItems, ...singleprod];
      const updatedCartItemsJSON = JSON.stringify(updatedCartItems);
      localStorage.setItem("cart-items", updatedCartItemsJSON);

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
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-1 transform hover:scale-105 transition duration-300 hover:shadow-lg">
      <Link to={`/products/${product.productId}`}>
        <img src={product?.images[0]?.image} alt={product.productName} className="w-full h-48 object-contain" />
      </Link>

      <div className="p-4">
        <Link to={`/products/${product?.productId}`} className="text-lg font-semibold text-gray-800 hover:text-blue-500 mb-2 block">
          {product.productName}
        </Link>

        <p className="text-gray-700 text-sm mb-2">Price Nrs: {product?.price}</p>

        <button
          onClick={() => handleCart(product)}
          className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition duration-300 focus:outline-none focus:shadow-outline"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/blog/${blog.id}`)} className="bg-white rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition duration-300 hover:shadow-lg">
      <img src={blog.image} alt="img" className="w-full h-48 object-cover" />

      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800 mb-2"> 
                   {blog?.title && blog?.title.length > 43
                    ? `${blog?.title.slice(0, 43)}...`
                    : blog?.title}
                    </p>
        <p className="text-gray-700 text-sm">By {blog.author}, Published on {blog.date}</p>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/shop/api/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((prod, i) => (
          <ProductCard key={i} product={prod} />
        ))}
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/blog/api/")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.map((blog, i) => (
          <BlogCard key={i} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export { Products, Blogs };
