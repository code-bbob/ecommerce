import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Route, Routes, json } from 'react-router'
import { Login, Signup } from './components/User/Register'
import { HeaderBottom, HeaderMid, HeaderTop } from './components/Header'
import { Home } from './components/Home'
import { SingleProduct } from './components/Products/SingleProduct'
import { SingleBlog } from './components/Blogs/singleblog'
import { SearchedProductsCategory } from './components/Products/SearchedProductsCategory'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './Redux/UserSlice'
import { HeaderBlog } from './components/Blogs/blogHeader'
import { BlogsView } from './components/Blogs/blogs'
import { CategoryBlog } from './components/Blogs/catblog'
import { BlogPost } from './components/Blogs/BlogPost'
import { setToCart } from './Redux/CartSlice'

// index.js or App.js


function App() {

  // localStorage.clear()
  const accesstoken = localStorage.getItem("token")
  console.log(accesstoken)
  const dispatch = useDispatch()
  
  useEffect(()=>{

    
    if (accesstoken) {
      
      axios
        .get("http://localhost:8000/api/userprofile/", {
          headers: {
            authorization: `bearer ${accesstoken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch(setUserDetails(res.data));
        })
        .catch((err) => console.log(err));
    }
    
    else {

// Retrieve cart items from localStorage
const cartItemsStr = localStorage.getItem("cart-items");
let cartItems = [];

try { 
  // Parse the JSON string to an array
  cartItems = JSON.parse(cartItemsStr) || [];
} catch (error) {
  console.error("Error parsing cart items:", error);
}

// Dispatch the setToCart action with the retrieved cart items
if (cartItems && Array.isArray(cartItems)) {
  console.log("herer")
  dispatch(setToCart(cartItems));
} else {
  // Handle the case where the parsed data is not an array
  console.error("Invalid cart items data:", cartItems);
} }




  },[])

  return (
    <>
    
      
            
    <Routes>
        <Route element={
      <>
        <HeaderTop />
        <HeaderMid />
        <HeaderBottom />
      </>
    }
    >
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/products" >
            <Route path=':id' element={<SingleProduct/>}/>
            <Route path={`/products/search/:search`} element={<SearchedProductsCategory/>}/>
         </Route>
         </Route>
          <Route path='/blog' element={<HeaderBlog/>}>
          <Route path ='' element={<BlogsView/>}/>
            <Route path=':id' element={<SingleBlog/>}/>
            <Route path='cat/:cat' element = {<CategoryBlog/>}/>
            <Route path='post' element = {<BlogPost/>}/>

        </Route>
      </Routes>
        

      
    
   
      
    </>
  )
}

export default App
