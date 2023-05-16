import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../components/Home/Main";

const initialProducts: IItem[] = [];

export const bookMarkedProducts = createSlice({
  name: "bookMarkReducer",
  initialState: initialProducts,
  reducers: {
    addBookMarkedProducts: (state: IItem[], action: PayloadAction<IItem>) => {
      return [...state, action.payload];
    },
    deleteBookMarkedProduct: (state: IItem[], action: PayloadAction<IItem>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const bookMarkStore = configureStore({
  reducer: bookMarkedProducts.reducer,
});
export const { addBookMarkedProducts, deleteBookMarkedProduct } =
  bookMarkedProducts.actions;
