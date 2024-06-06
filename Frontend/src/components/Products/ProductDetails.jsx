import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { getSingleProducts } from "../../api/Api";
import axios from "axios";
import { IoIosStarOutline } from "react-icons/io";
import { FaRegCheckSquare } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToCart } from "../../Redux/CartSlice";


export function ProductDetails() {
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null);
  const params = useParams();
  const productId = params.id;
  console.log("params",params)
  console.log("id",productId)
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }}

  useEffect(() => {
    axios
      .get(`http://localhost:8000/shop/api/${productId}`)
      .then((res) => {
        console.log("here is product",res.data[0]);
        setProduct(res.data[0]);
      })
      .catch((err) => {
        console.log("error brah",err);
      });
  }, [params]);

  console.log("pr", product);
  return (
    <>
    <ToastContainer/>
      <div className="bg-gray-300 px-7 py-10 -my-4 h-100%">
       
          
          <div className="productDiv bg-white p-4 flex relative ml-72" >
            <div className="productDiv">
              <img className="productImg absolute -left-36" src={product?.images[0]?.image} alt="" />
            </div>
            <div className="">

            <h1>{product?.name}</h1>
            <div className="flex items-center gap-2" >
              <span className="flex">
                <IoIosStarOutline />
                <IoIosStarOutline />
                <IoIosStarOutline />
                <IoIosStarOutline />
                <IoIosStarOutline />
              </span>
              <span>0 Reviews / write a review</span>
            </div>

            <h1 className="text-red-600">NRS. {product?.price}</h1>
            <span className="flex items-center my-3 gap-2">
              <span>Availability</span>
              <span className="flex">

              <FaRegCheckSquare className="self-center" />
              In stock
              </span>
            </span>

            <div className="flex flex-col gap-3">
              <div className="flex gap-3">

              <span className="">Qty</span>
              
              <div className="flex items-center">
                <div
                  className="bg-gray-200 p-2 cursor-pointer"
                  onClick={decreaseQuantity}
                >
                  <FaArrowDown className=" text-gray-600" />
                </div>
                <div className="bg-white px-3 py-1 font-semibold">{quantity}</div>
                <div
                  className="bg-gray-200 p-2 cursor-pointer"
                  onClick={increaseQuantity}
                >
                  <FaArrowUp className=" text-gray-600" />
                </div>
              </div>
              </div>
              <div className="flex  gap-4">

              <button onClick={() => {
                    console.log("here");
                    console.log("product clicked",product)
                    const pr = {...product, quantity: quantity}
                    const ProductsToDispatch = [pr]
                    console.log("asdasd",ProductsToDispatch)

                    //creating a nev key value pair
                    
                    // for (let i = 0; i < quantity; i++) {
                    // dispatch(setToCart(ProductsToDispatch));

                    // }
                    dispatch(setToCart(ProductsToDispatch))
                    toast.success(`${product.name} added to Cart`, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: false,
                      theme: "dark",
                    });
                  }}
              className="w-50 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg ">Add to Cart</button>
              <button className="border bg-white hover:bg-orange-300 px-2 ">
                <CiHeart />
              </button>
              </div>

            </div>
          </div>
        </div>
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
