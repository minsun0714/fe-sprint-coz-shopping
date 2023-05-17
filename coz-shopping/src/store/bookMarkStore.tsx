import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../components/Home/MainStyle";

const bookMarkedProductsLocalStorage: IItem[] = [];

if (localStorage.length) {
  for (const key in localStorage) {
    const value = localStorage.getItem(key);
    if (value) {
      bookMarkedProductsLocalStorage.push(JSON.parse(value));
    }
  }
}

export const bookMarkedProducts = createSlice({
  name: "bookMarkReducer",
  initialState: bookMarkedProductsLocalStorage,
  reducers: {
    addBookMarkedProducts: (state: IItem[], action: PayloadAction<IItem>) => {
      localStorage.setItem(
        String(action.payload.id),
        JSON.stringify(action.payload)
      );
      return [...state, action.payload];
    },
    deleteBookMarkedProduct: (state: IItem[], action: PayloadAction<IItem>) => {
      localStorage.removeItem(String(action.payload.id));
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const bookMarkStore = configureStore({
  reducer: bookMarkedProducts.reducer,
});
export const { addBookMarkedProducts, deleteBookMarkedProduct } =
  bookMarkedProducts.actions;
