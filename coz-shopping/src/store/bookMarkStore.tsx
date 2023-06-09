import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../Pages/Home/MainType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastImg, ToastAction, ToastImgType } from "../GlobalStyle";

const bookMarkedProductsLocalStorage: IItem[] = [];

if (localStorage.length) {
  for (const key in localStorage) {
    const value = localStorage.getItem(key);
    if (value) {
      if ("type" in JSON.parse(value)) {
        bookMarkedProductsLocalStorage.push(JSON.parse(value));
      }
    }
  }
}

const toastUIOnUrl: ToastImgType = "/image/Toast UI on.png";
const toastUIOffUrl: ToastImgType = "/image/Toast UI off.png";

const tostify = (actionType: ToastAction) =>
  toast(
    actionType === "add" ? (
      <ToastImg src={toastUIOnUrl} />
    ) : (
      <ToastImg src={toastUIOffUrl} />
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
