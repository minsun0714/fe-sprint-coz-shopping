import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Home/Main";
import ProductList from "./components/ProductList/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/products/list' element={<ProductList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
