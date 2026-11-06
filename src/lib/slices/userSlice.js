import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    isLoggedIn: null, // აქ  რეფრეშზე ეგრევე რო არ გააგდოს,  null ჯობია,
  },
  reducers: {
    updateUser: (state, action) => {
      state.name = action.payload.username;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    //  logout ფუნქცია
    logout: (state) => {
      state.name = "";
      state.isLoggedIn = false;
      // ვშლით ტოკენებს, რომ სისტემამ "დაგვივიწყოს"
      localStorage.removeItem("userToken");
      sessionStorage.removeItem("userToken");
    },
  },
});

// აუცილებელია აქაც დაემატოს logout, რომ სხვა ფაილებმა დაინახონ
export const { updateUser, logout } = userSlice.actions;
export default userSlice.reducer;