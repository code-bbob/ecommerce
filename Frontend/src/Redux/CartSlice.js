import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // setUserDetails: (state, action) => {
    //   state.value = action.payload
    //  },
     setToCart :(state,action) => {
        let product = action.payload   
        console.log(product)
        let oldItems = [...state.cartItems]  
        let {productId, productName,price,image, category} = product

        let matched = oldItems.find(el => el.productId == productId)

        if(matched){
            oldItems = oldItems.map((el)=>{
                if(el.productId === productId){
                    return {...el, quantity: el.quantity + 1  }
                }
                
                return el
            })

        }else {

             oldItems.push({productId, productName,price,image, category, quantity: 1})
        }


        state.cartItems = oldItems

        
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