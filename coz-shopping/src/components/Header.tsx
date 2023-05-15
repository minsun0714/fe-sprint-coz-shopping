import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./ProductList/ProductList";
import styled from "styled-components";
import ReactModal from "react-modal";
import Main from "./Home/Main";
import App from "../App";
ReactModal.setAppElement("#root");

const modalStyle: ReactModal.Styles = {
  content: {
    top: "23%",
    left: "87vw",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    height: "200px",
    position: "absolute",
  },
};

const HeaderWrapper = styled.header`
  border: 1px solid transparent;
  margin: none;
  height: 50px;
  box-shadow: 0px 5px 5px gray;
  display: flex;
  flex-direction: row;
`;

const CodeStatesLogo = styled.img`
  height: 25px;
  padding: 13px 10px 10px 2vw;
`;

const COZShopping = styled.img`
  height: 25px;
  padding: 13px 10px 10px 1vw;
`;

const Hamburger = styled.img`
  height: 25px;
  margin-left: auto;
  margin-right: 30px;
  margin-top: 12px;
`;

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpenClose = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <HeaderWrapper>
      <Link to='/'>
        <CodeStatesLogo src='/image/로고.png'></CodeStatesLogo>
        <COZShopping src='/image/쇼핑몰 이름.jpg'></COZShopping>
      </Link>
      <Hamburger
        src='/image/hamburger.jpg'
        onClick={handleModalOpenClose}
      ></Hamburger>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleModalOpenClose}
        style={modalStyle}
      >
        <nav>
          <div>OOO님, 안녕하세요!</div>
          <ul>
            <li>
              <Link to='/products/list' onClick={handleModalOpenClose}>
                상품리스트 페이지
              </Link>
            </li>
            <li>북마크 페이지</li>
          </ul>
        </nav>
      </ReactModal>
    </HeaderWrapper>
  );
}

export default Header;
