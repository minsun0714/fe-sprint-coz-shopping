import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { products } from "./productsStore";
import { bookMarkedProducts } from "./bookMarkStore";

const rootReducer = combineReducers({
  products: products.reducer,
  bookMarkedProducts: bookMarkedProducts.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
