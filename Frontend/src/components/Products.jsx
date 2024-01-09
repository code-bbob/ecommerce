import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"



export function Products(){
    
  const navigate = useNavigate()
    const [products, setProducts] = useState([])
    useEffect ( ()=> {
        

        axios.get("http://localhost:8000/shop/api/")
        .then((res)=>{
          setProducts(res.data)
          console.log(res.data)
    
          
        })
        .catch((err)=>{
          console.log(err)
        })
      },[])


    return (
        <>
          <div className="flex p-5 gap-5 mb-10">

          {

            products.map((prod,i)=>{
              return (
                <>
               
                <div onClick={()=>{
                  navigate(`/products/${prod.productId}`)
                  
                }}
                  className="bg-white p-3">
                  <img className="h-40 w-40 my-3 mx-auto" src={prod.image} alt="" />
                  <p className="p-0 m-0">{prod.series}{prod.productName}</p>
                  <p>Price Nrs:{prod.price}</p>
                  <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg w-full">Add To Cart</button>
                </div>
                </>
              )
              
            })
          }
          </div>
        </>
    )
}

export function Blogs(){

  return (
  
    <>
    <div className="flex p-5 gap-5">
      <div className="bg-white p-7 rounded-lg">
        <img src="" alt="oop" />
        <p className="p-0 m-0">Blogs for Laptops</p>
        <p></p>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg w-full">Vie Blogs</button>


      </div>
      <div className="bg-white p-7 rounded-lg">
        <img src="" alt="oop" />
        <p className="p-0 m-0">Blogs for Laptops</p>
        <p></p>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg w-full">Vie Blogs</button>


      </div>
      <div className="bg-white p-7 rounded-lg">
        <img src="" alt="oop" />
        <p className="p-0 m-0">Blogs for Laptops</p>
        <p></p>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg w-full">Vie Blogs</button>


      </div>
      <div className="bg-white p-7 rounded-lg">
        <img src="" alt="oop" />
        <p className="p-0 m-0">Blogs for Laptops</p>
        <p></p>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg w-full">Vie Blogs</button>


      </div>
      <div className="bg-white p-7 rounded-lg">
        <img src="" alt="oop" />
        <p className="p-0 m-0">Blogs for Laptops</p>
        <p></p>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg w-full">Vie Blogs</button>


      </div>
     
      
    </div>
    </>

  )
    
  
}
