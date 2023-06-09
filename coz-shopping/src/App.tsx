import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/components/Header";
import Footer from "./Footer/components/Footer";
import Main from "./Pages/Home/Main";
import ProductList from "./Pages/ProductList/ProductList";
import BookMarkList from "./Pages/BookMarkList/BookMarkList";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer } from "./GlobalStyle";

function App() {
  return (
    <Router>
      <StyledToastContainer autoClose={2500} closeButton={false} />
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/products/list' element={<ProductList />} />
        <Route path='/bookmark' element={<BookMarkList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
