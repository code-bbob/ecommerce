import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"



export function SingleProduct(){

    const [product, setProduct] = useState([])
    const params = useParams()
    const productId = params.id
    
    useEffect(()=>{

        
        axios.get(`http://localhost:8000/shop/api/${productId}`)
        .then((res)=>{
            console.log("Res",res.data)
            setProduct(res.data)
            console.log("asdasd",product)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    },[])
    useEffect(() => {
        console.log("Updated product:", product);
      }, [product]);

    return (
        <>
        <div>
            
{                console.log("hishishis",product.brandName)
}                 
            
            {/* <div className="bg-gray-400">
                <img src={product.image} alt="oop" />
                <p className="">{product.productName}</p>
                <p>{product.brandName}</p>

            </div> */}
            
        </div>
        </>
    )
}