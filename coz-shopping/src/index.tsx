import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store/productsStore";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import normalize from "normalize.css";

const GlobalStyle = createGlobalStyle`
  ${normalize}

header {
  margin: 0;
}
`;

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
