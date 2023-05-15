import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../components/Home/Main";

const initialProducts: IItem[] = [];

export const bookMarkedProducts = createSlice({
  name: "bookMarkReducer",
  initialState: initialProducts,
  reducers: {
    getBookMarkedProducts: (state: IItem[], action: PayloadAction<IItem>) => {
      return [...state, action.payload];
    },
  },
});

export const bookMarkStore = configureStore({
  reducer: bookMarkedProducts.reducer,
});
export const { getBookMarkedProducts } = bookMarkedProducts.actions;
