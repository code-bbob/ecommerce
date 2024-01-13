import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Route, Routes } from 'react-router'
import { Login, Signup } from './components/User/Register'
import { HeaderBottom, HeaderMid, HeaderTop } from './components/Header'
import { Home } from './components/Home'
import { SingleProduct } from './components/Products/SingleProduct'
import { SearchedProductsCategory } from './components/Products/SearchedProductsCategory'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './Redux/UserSlice'
// index.js or App.js


function App() {

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
  




  },[])

  return (
    <>
    
      <HeaderTop/>
      <HeaderMid/>
      <HeaderBottom/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/products" >
          <Route path=':id' element={<SingleProduct/>}/> 
          <Route path={`/products/search/:search`} element={<SearchedProductsCategory/>}/>
          
        </Route>
        

      </Routes>
      
    
   
      
    </>
  )
}

export default App
