import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { getSingleProducts } from "../../api/Api";
import axios from "axios";



export function SingleProduct() {
  const [product,setProduct] = useState({})
  const params = useParams();
  const productId = params.id;
  
  
  useEffect(() => {
    axios
      .get(`http://localhost:8000/shop/api/${productId}`)
      .then((res) => {
        console.log(res.data)
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);
    
    console.log("pr", product);
  return (
    <>
      <div>
        <p>
          {product.productName}
          </p>
      </div>
    </>
  );
}

  
    // const { 
    //   data: product,
    //   isloading: productLoading,
    //   isError: productError,
    // } = useQuery({
    //   queryKey: ["product",productId],
    //   queryFn: ()=> getSingleProducts(productId),
  
    // });
  // if (productLoading) return <div>Loading...</div>;
  
  // if (productError) return <div>Error fetching data</div>;

  // console.log("queriedproduct",product)