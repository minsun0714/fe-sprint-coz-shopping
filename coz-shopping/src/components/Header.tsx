import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
Modal.setAppElement("#root");

const modalStyle: ReactModal.Styles = {
  content: {
    top: "17%",
    left: "91%",
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
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleOpenModal = () => {
    setIsDropDownOpen(true);
  };

  const handleCloseModal = () => {
    setIsDropDownOpen(false);
  };

  return (
    <HeaderWrapper>
      <CodeStatesLogo src='./image/로고.png'></CodeStatesLogo>
      <COZShopping src='./image/쇼핑몰 이름.jpg'></COZShopping>
      <Hamburger
        src='./image/hamburger.jpg'
        onClick={handleOpenModal}
      ></Hamburger>
      <Modal
        isOpen={isDropDownOpen}
        onRequestClose={handleCloseModal}
        style={modalStyle}
      >
        <div>OOO님, 안녕하세요!</div>
        <div>상품리스트 페이지</div>
        <div>북마크 페이지</div>
      </Modal>
    </HeaderWrapper>
  );
}

export default Header;
