import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // setToCart: (state, action) => {
    //   // Assuming action.payload is an array of products
    //   const products = action.payload;
    //   const oldItems = [...state.cartItems];
    
    //   const updatedItems = products.map((product) => ({
    //     productId: product.productId,
    //     productName: product.productName,
    //     price: product.price,
    //     image: product.image,
    //     category: product.category
    //   }));
    
    //   updatedItems.forEach((updatedItem) => {
    //     const matchedIndex = oldItems.findIndex((el) => el.productId === updatedItem.productId);
    
    //     if (matchedIndex !== -1) {
    //       // If the product is already in the cart, update the quantity
    //       oldItems[matchedIndex] = {
    //         ...oldItems[matchedIndex],
    //         quantity: oldItems[matchedIndex].quantity + 1
    //       };
    //     } else {
    //       // If the product is not in the cart, add it with quantity 1
    //       oldItems.push({ ...updatedItem, quantity: 1 });
    //     }
    //   });
    
    //   state.cartItems = oldItems;
    //   console.log("Items after refresh", state.cartItems);
    // },
    
     setToCart :(state,action) => {
      console.log("called with action here",action)
        let products = action.payload   
        console.log("product here",products)

        let oldItems = [...state.cartItems] 
        console.log("old",oldItems) 

        const p = products.map((product)=>{
          return {
            productId: product.product_id,
            productName: product.name,
            price: product.price,
            image: product.images[0].image,
            category: product.category

          }
         })
         // let {productId, productName,price,image, category} = product
        
         p.forEach((pItem) => {
          let matched = oldItems.find((el) => el.productId == pItem.productId);
        
        if(matched){
            oldItems = oldItems.map((el)=>{
                if(el.productId === pItem.productId){
                    return {...el, quantity: el.quantity + 1  }
                }
                
                return el
            })

        }else {

             oldItems.push({...pItem, quantity: 1})
        }
      });

        state.cartItems = oldItems
        console.log("itemsafterrefresh",state.cartItems)
        
        
     },

     removeFromCart: (state, action) => {
        const { productId } = action.payload;
      
        const updatedCartItems = state.cartItems.map(item => {
          if (item.productId === productId) {
            // If quantity is greater than 1, decrease it, otherwise remove the item from the cart
            return {
              ...item,
              quantity: Math.max(item.quantity - 1, 0)
            };
          }
          return item;
        });
      
        // Filter out items with quantity greater than 0
        state.cartItems = updatedCartItems.filter(item => item.quantity > 0);
      }
      
   
  },
})

// Action creators are generated for each case reducer function
export const { setToCart, removeFromCart } = CartSlice.actions

export default CartSlice.reducer