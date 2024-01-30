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


export function SingleProduct() {
  const dispatch = useDispatch()
  const [product, setProduct] = useState({});
  const params = useParams();
  const productId = params.id;
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
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("pr", product);
  return (
    <>
    <ToastContainer/>
      <div className="bg-gray-300 p-7 my-5">
        <div className="flex  gap-7">
          <div className="bg-white h-100% w-40 "></div>
          <div>
            <img className="h-full max-w-xl" src={product[0]?.image} alt="oops" />
          </div>
          <div>
            <h1>{product[0]?.productName}</h1>
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

            <h1 className="text-red-600">NRS. {product[0]?.price}</h1>
            <span className="flex items-center my-3 gap-2">
              <span>Availability</span>
              <span className="flex">

              <FaRegCheckSquare className="self-center" />
              In stock
              </span>
            </span>

            <div className="flex gap-2">
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
              <button onClick={() => {
                    console.log("here");
                    dispatch(setToCart(product[0]));
                    toast.success(`${product[0].productName} added to Cart`, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: false,
                      theme: "dark",
                    });
                  }}
              className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg mx-3">Add to Cart</button>
              <button className="border bg-white hover:bg-orange-300 px-2 ">
                <CiHeart />
              </button>
              
            </div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: product[0]?.desc}} />
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
