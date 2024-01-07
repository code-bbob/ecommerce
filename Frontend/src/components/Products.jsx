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
        <div>
            <div>
                <img src={products.image} alt="" />
                <p>{products.productName}</p>
            </div>
        </div>
        </>
    )
}