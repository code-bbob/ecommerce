import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Route, Routes } from 'react-router'
import { Login, Signup } from './components/User/Register'
import { HeaderBottom, HeaderMid, HeaderTop } from './components/Header'
import { Home } from './components/Home'
import { SingleProduct } from './components/Products/SingleProduct'
import { SearchedProductsCategory } from './components/Products/SearchedProductsCategory'
// index.js or App.js


function App() {



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
