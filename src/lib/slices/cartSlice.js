import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [], 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartProducts[itemIndex].quantity += 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cartProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartProducts[itemIndex].quantity > 1) {
        state.cartProducts[itemIndex].quantity -= 1;
      }
    },
    deleteFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );
    },
    //  კალათის სრული გასუფთავების ფუნქცია
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

//  ექსპორტში დავამატე clearCart
export const { addToCart, decreaseQuantity, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;