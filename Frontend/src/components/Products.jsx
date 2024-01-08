import axios from "axios"
import { useEffect, useState } from "react"



export function Products(){
    
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
        <div className="flex gap-10 mt-36">
          {

            products.map((prod,i)=>{
              return (
                <>
                <div className="">
                  <img className="h-40 w-40" src={prod.image} alt="" />
                  <p>{prod.productName}</p>
                </div>
                </>
              )
              
            })
          }
        </div>
        </>
    )
}