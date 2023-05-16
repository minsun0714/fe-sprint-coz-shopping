import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store/rootStore";
import { Provider } from "react-redux";
import { GlobalStyle } from "./GlobalStyle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
