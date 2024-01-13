import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Route, Routes } from 'react-router'
import { Login, Signup } from './components/User/Register'
import { HeaderBottom, HeaderMid, HeaderTop } from './components/Header'
import { Home } from './components/Home'
import { SingleProduct } from './components/Products/SingleProduct'
import { SingleBlog } from './components/Blogs/singleblog'
// index.js or App.js


function App() {



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
         </Route>
         </Route>
          <Route path="/blog" >
            <Route path=':id' element={<SingleBlog/>}> </Route>

        </Route>

      </Routes>
      
    
   
      
    </>
  )
}

export default App
