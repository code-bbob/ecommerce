import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Route, Routes, json } from "react-router";
import { Login, Signup } from "./components/User/Register";
import { HeaderBottom, HeaderMid, HeaderTop } from "./components/Header";
import { Home } from "./components/Home";
import { ProductDetails } from "./components/Products/ProductDetails";
import { SingleBlog } from "./components/Blogs/singleblog";
import { SearchedProductsCategory } from "./components/Products/SearchedProductsCategory";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./Redux/UserSlice";
import { HeaderBlog } from "./components/Blogs/blogHeader";
import { BlogsView } from "./components/Blogs/blogs";
import { CategoryBlog } from "./components/Blogs/catblog";
import { BlogPost } from "./components/Blogs/BlogPost";
import { setToCart } from "./Redux/CartSlice";

// index.js or App.js

function App() {
    // localStorage.clear()
  const [cartItems, setcartItems] = useState({});
  const accesstoken = localStorage.getItem("token");
  const dispatch = useDispatch();
  // console.log(accesstoken);

  useEffect(() => {
    // console.log("here 1");
    if (accesstoken) {
      // console.log("here again");
      axios
        .get("http://localhost:8000/userauth/api/userprofile/", {
          headers: {
            authorization: `Bearer ${accesstoken}`,
          },
        })
        .then((res) => {
          // console.log("user info ", res.data);
          dispatch(setUserDetails(res.data));
        })
        .catch((err) => console.log(err));

      axios
        .get("http://localhost:8000/cart/api/", {
          headers: {  
            authorization: `Bearer ${accesstoken}`,
          },
        })

        .then((res) => {
          // console.log("here is value",res)
          setcartItems(res.data);
          // console.log("cart items from backend", cartItems);
          //res.data bata ordered_items bane matra filter garera dispatch garuparyo redux slice ma kina bhane unnecessary junk chaidaina

          const filteredCart = cartItems.map(item => item.order_items);
          // console.log("filtered cart items", filteredCart);


          //ok everything works just fine tara consistency ra integrity banne chij xaina data ko product ra id and quantity dinxa yo array le tara dispatch garda initial product ko details jasari sapp data including productId quantity pic sapp bako dispatch garun parxa ani hunxa so do that i.e change the model of this return of get request anni dispatch handa hunxa but still euta arko error xa ctrl s handa same hune wala  yo solve bayepaxi sayad remove ma ni same nai copy paste hola nnothing specific 
          // dispatch(setToCart(filteredCart));
        })
        .catch((err) => console.log(err));
    }

    //   if(cart_items?.length > 0 ){

    //     const Ucart_items = cart_items.parse(cart_items)
    //     const fCart = [...Ucart_items]

    //     fCart.forEach((items)=>{

    //       axios.post("localhost:8000/cart/api/",{
    //       headers : {
    //         authorization: `bearer ${accesstoken}`
    //       },

    //       order_items : [
    //         {
    //           product : items.productId,
    //           quantity : items.quantity,
    //         }
    //       ]

    //     })
    //     .then((res)=>{
    //       console.log(res)
    //       dispatch(setToCart(fCart))
    //       localStorage.removeItem("cart-items")

    //     })
    //       .catch((err)=>{
    //         console.log(err)
    //       })
    //     })

    // }
    else {
      // Retrieve cart items from localStorage
      const cartItemsStr = localStorage.getItem("cart-items");
      let cartItems = [];

      try {
        // Parse the JSON string to an array
        cartItems = JSON.parse(cartItemsStr) || [];
        console.log("herer", cartItems);
        dispatch(setToCart(cartItems));
        // localStorage.clear();
      } catch (error) {
        console.error("Error parsing cart items:", error);
      }
      // Dispatch the setToCart action with the retrieved cart items
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          element={
            <>
              <HeaderTop />
              <HeaderMid />
              <HeaderBottom />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products">
            <Route path=":id" element={<ProductDetails />} />
            <Route
              path={`/products/search/:search`}
              element={<SearchedProductsCategory />}
            />
          </Route>
        </Route>
        <Route path="/blog" element={<HeaderBlog />}>
          <Route path="" element={<BlogsView />} />
          <Route path=":id" element={<SingleBlog />} />
          <Route path="cat/:cat" element={<CategoryBlog />} />
          <Route path="post" element={<BlogPost />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
