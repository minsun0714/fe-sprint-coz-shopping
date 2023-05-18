import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../Pages/Home/MainType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastImg, ToastAction } from "../GlobalStyle";

const bookMarkedProductsLocalStorage: IItem[] = [];

if (localStorage.length) {
  for (const key in localStorage) {
    const value = localStorage.getItem(key);
    if (value) {
      bookMarkedProductsLocalStorage.push(JSON.parse(value));
    }
  }
}

const tostify = (actionType: ToastAction) =>
  toast(
    actionType === "add" ? (
      <ToastImg src='/image/Toast UI on.png' />
    ) : (
      <ToastImg src='/image/Toast UI off.png' />
    ),
    { position: toast.POSITION.BOTTOM_RIGHT }
  );

export const bookMarkedProducts = createSlice({
  name: "bookMarkReducer",
  initialState: bookMarkedProductsLocalStorage,
  reducers: {
    addBookMark: (state: IItem[], action: PayloadAction<IItem>) => {
      localStorage.setItem(
        String(action.payload.id),
        JSON.stringify(action.payload)
      );

      tostify("add");

      return [...state, action.payload];
    },
    deleteBookMark: (state: IItem[], action: PayloadAction<IItem>) => {
      localStorage.removeItem(String(action.payload.id));

      tostify("delete");

      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const bookMarkStore = configureStore({
  reducer: bookMarkedProducts.reducer,
});
export const { addBookMark, deleteBookMark } = bookMarkedProducts.actions;
