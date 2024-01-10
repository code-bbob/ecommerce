import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function SingleProduct() {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/shop/api/${productId}`)
      .then((res) => {
        setProduct(res.data);
        console.log("pr", product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        {product.map((productDetails) => {
          return (
            <>
            
            </>
          );
        })}
      </div>
    </>
  );
}
