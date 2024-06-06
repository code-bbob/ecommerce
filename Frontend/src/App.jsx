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
import { CustomPC } from "./components/CustomPc/CustomPC";
// import { FilteredProduct } from "./components/Products/FilteredProduct";

// index.js or App.js

function App() {
    // localStorage.clear()
  const [cartItems, setcartItems] = useState(null);
  const accesstoken = localStorage.getItem("token");
  const cartProducts = localStorage.getItem("cart-items");
  
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
          console.log("here is value***************",res)
          setcartItems(res.data);

          //cartProduct is from localstorage and cartItems if from backend so it checks if item from backend is null but the localstorage there is value
          if(cartItems == null && cartProducts !== null){
            const updatedCartProducts = cartProducts
            ? JSON.parse(cartProducts): [];
    
            console.log("updatedCartProducts********8",updatedCartProducts)
            updatedCartProducts.map((item)=>{
    
              axios
              .post(
                "http://localhost:8000/cart/api/",
                {
                  order_items: [
                    {
                      product: item.product_id,
                      quantity: item.quantity,
                    }
                  ]
                },
                {
                  headers: {
                    Authorization: `Bearer ${accesstoken}`,
                  },
                }
              )
              .then((res) => {
                console.log("posting##############3")
                console.log("post successful.............", res);
    
              })
              .catch((err) => {
                console.log(err);
              });
              
            })
            dispatch(setToCart(updatedCartProducts));
            localStorage.removeItem("cart-items")

          // }
          
          // console.log("cart items from backend", cartItems);
          // //res.data bata ordered_items bane matra filter garera dispatch garuparyo redux slice ma kina bhane unnecessary junk chaidaina

          // const filteredCart = cartItems ? cartItems.map(item => item.order_items) : [];
          // // console.log("filtered cart items", filteredCart);


        
          // // dispatch(setToCart(filteredCart));
    }})
        .catch((err) => console.log(err));
    }

  
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

  
    useEffect(() => {
      console.log("cart items from backend", cartItems);
            
      if(cartItems != null){

        const filteredCart = cartItems ? cartItems.filter(item => item.order_items).flatMap(item => item.order_items) : [];
//filters and flatmap vithout creating a nev array cause map vould create a nev array 
      console.log("filtered cart items1", filteredCart);
      const updatedOrderItems = filteredCart.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
    
      console.log("filtered cart items100", updatedOrderItems);
      //cart ma pathauda product vith quantity pathaunu parxa product xuttai quantity xuttai esle read gardainna so tyo garne ra kati xoti order create hunxa kati products auxa tyo ni bujne

        dispatch(setToCart(updatedOrderItems));
      }
      else {}
      
  }, [cartItems]); // Add cartItems as a dependency to useEffect
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
          <Route path="/customPc" element={<CustomPC />} />
          {/* <Route path="/categories/:category" element={<FilteredProduct />} /> */}

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
