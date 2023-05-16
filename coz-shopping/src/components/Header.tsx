import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

const modalStyle: ReactModal.Styles = {
  content: {
    top: "130px",
    left: "83vw",
    bottom: "auto",
    transform: "translate(-30%, -32%)",
    width: "200px",
    height: "183px",
    position: "sticky",
    padding: "0",
    paddingRight: "0px",
    borderRadius: "12px",
    zIndex: "9999",
  },
};

const HeaderWrapper = styled.header`
  position: fixed;
  z-index: 1;
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
  position: fixed;
  height: 45px;
  padding: 10px 10px 10px 19vw;
  margin-top: 10px;
`;

const COZShopping = styled.img`
  position: fixed;
  height: 45px;
  padding: 13px 10px 10px 24vw;
  margin-top: 14px;
`;

const Hamburger = styled.img`
  height: 20px;
  margin-left: auto;
  margin-right: 21vw;
  margin-top: 25px;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const PageMenu = styled.ul`
  margin: 0;
  padding: 0 0 0 0px;
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
  padding: 10px 0 10px 25px;
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
