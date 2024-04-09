import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToCart } from "../Redux/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import SingleProduct from "./Products/SingleProduct";

export function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state)=>state.user.value)
  const [products, setProducts] = useState([]);

  // const [orderedProducts, setOrderProducts] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:8000/shop/api/")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


 

  return (
    <>
      <ToastContainer />
      <div className="flex p-5 gap-5 mb-10">
        {products.map((prod, i) => {
          return (
            <>
            <SingleProduct key={i} prod ={prod}

            />
            </>
          );
        })}
      </div>
    </>
  );
}

export function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/blog/api/")
      .then((res) => {
        setBlogs(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
    <div className="flex p-5 gap-5 mb-10">
    {

blogs.map((blog,i)=>{
  return (
    <>
   
    <div key={i} onClick={()=>{
      navigate(`/blog/${blog.id}`)
      
    }}
      className="bg-white p-3">
      <img className="h-40 w-40 my-3 mx-auto" src={blog.image} alt="img" />
      <p className="p-0 m-0">{blog.title} by {blog.author}</p>
      <p>{blog.content}</p>
    </div>
    </>
  )
  
})
}
    </div>
    </>
  );
}



