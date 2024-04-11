import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToCart } from "../Redux/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SingleProduct from "./Products/SingleProduct";


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

export function Products () {
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
            <SingleProduct key={i} prod ={prod}/>
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
}
