import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToCart } from "../Redux/CartSlice";
import { ToastContainer, toast } from "react-toastify";

export function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state)=>state.user.value)
  const [products, setProducts] = useState([]);
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


  function handleCart(prod){
    
    const singleprod = [prod]
    if(userDetails){
      const existingCartItemsJSON = localStorage.getItem("cart-items");
      const existingCartItems = existingCartItemsJSON ? JSON.parse(existingCartItemsJSON) : [];
      const updatedCartItems = [...existingCartItems];
      dispatch(setToCart(updatedCartItems))
      localStorage.removeItem(cart-items)
      // axios.post to post in backend with userDetails and prod details
       
      
    }
    else{
      console.log("here and")
      dispatch(setToCart(singleprod));
    const existingCartItemsJSON = localStorage.getItem("cart-items");
    const existingCartItems = existingCartItemsJSON ? JSON.parse(existingCartItemsJSON) : [];
    const updatedCartItems = [...existingCartItems,...singleprod];
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
    <>
      <ToastContainer />
      <div className="flex p-5 gap-5 mb-10">
        {products.map((prod, i) => {
          return (
            <>
              <div className="p-3">
                <div
                  onClick={() => {
                    navigate(`/products/${prod.productId}`);
                  }}
                  className="bg-white p-3"
                >
                  <img
                    className="h-40 w-40 my-3 mx-auto"
                    src={prod.image}
                    alt=""
                  />
                  <p className="p-0 m-0">
                    {prod.series}
                    {prod.productName}
                  </p>
                  <p>Price Nrs:{prod.price}</p>
                </div>
                <button
                  onClick={()=> {handleCart(prod)}}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg w-full"
                >
                  Add To Cart
                </button>
              </div>
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
