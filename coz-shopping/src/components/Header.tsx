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
    top: "15%",
    left: "90vw",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "200px",
    height: "183px",
    position: "absolute",
    padding: "0",
    borderRadius: "12px",
  },
};

const HeaderWrapper = styled.header`
  position: fixed;
  z-index: 999;
  top: 0;
  background-color: white;
  margin: none;
  height: 70px;
  width: 100vw;
  box-shadow: 0px 3px 4px gray;
  display: flex;
  flex-direction: row;
`;

const CodeStatesLogo = styled.img`
  height: 45px;
  padding: 7px 10px 10px;
`;

const COZShopping = styled.img`
  height: 45px;
  padding: 13px 10px 10px 1vw;
  margin-top: 14px;
`;

const Hamburger = styled.img`
  height: 20px;
  margin-left: auto;
  margin-right: 30px;
  margin-top: 25px;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const PageMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Greeting = styled.p`
  text-align: center;
  margin-top: 23px;
`;

const PageItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  margin-left: 0vw;
  padding-left: 2vw;
  padding-bottom: 10px;
  padding-top: 10px;
  border-top: 1px solid gray;
  a {
    text-decoration: none;
    color: black;
  }
`;

const Icon = styled.img`
  margin-right: 10px;
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
        <Nav>
          <Greeting>OOO님, 안녕하세요!</Greeting>
          <PageMenu>
            <PageItem>
              <Link to='/products/list' onClick={handleModalOpenClose}>
                <Icon src='/image/상품 아이콘.png' />
                상품리스트 페이지
              </Link>
            </PageItem>
            <PageItem>
              <Link to='/bookmark' onClick={handleModalOpenClose}>
                <Icon src='/image/북마크 아이콘.png' />
                북마크 페이지
              </Link>
            </PageItem>
          </PageMenu>
        </Nav>
      </ReactModal>
    </HeaderWrapper>
  );
}

export default Header;
