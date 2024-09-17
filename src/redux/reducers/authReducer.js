import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  accesstoken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
    removeAuth: (state) => {
      state.authData = initialState;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { addAuth, removeAuth } = authSlice.actions;

export const authSelector = (state) => state.authReducer.authData;
