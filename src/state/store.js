import { configureStore, createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = authSlice.actions;

export const selectUsername = (state) => {
  return state.auth.username;
};

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
});
