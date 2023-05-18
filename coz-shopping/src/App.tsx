import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Home/Main";
import ProductList from "./components/ProductList/ProductList";
import BookMarkList from "./components/BookMarkList/BookMarkList";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer } from "./GlobalStyle";

function App() {
  return (
    <Router>
      <StyledToastContainer autoClose={5000} closeButton={false} />
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
