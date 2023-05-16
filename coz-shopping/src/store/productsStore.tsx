import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../components/Home/Main";

const initialProducts: IItem[] = [];

export const products = createSlice({
  name: "productsReducer",
  initialState: initialProducts,
  reducers: {
    getAllProducts: (state: IItem[], action: PayloadAction<IItem[]>) => {
      if (state.length === 0) {
      }

      return [...state, ...action.payload];
    },
  },
});

export const productStore = configureStore({ reducer: products.reducer });
export const { getAllProducts } = products.actions;
