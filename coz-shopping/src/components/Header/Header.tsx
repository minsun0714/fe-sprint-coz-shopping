import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import {
  modalStyle,
  HeaderWrapper,
  CodeStatesLogo,
  COZShopping,
  Hamburger,
  Nav,
  PageMenu,
  Greeting,
  PageItem,
  Icon,
} from "./HeaderStyle";
ReactModal.setAppElement("#root");

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpenClose = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <HeaderWrapper>
      <Link to='/'>
        <CodeStatesLogo
          src='/image/로고.png'
          alt='코드스테이츠 로고'
        ></CodeStatesLogo>
        <COZShopping
          src='/image/쇼핑몰 이름.jpg'
          alt='쇼핑몰 이름 코즈 쇼핑'
        ></COZShopping>
      </Link>
      <Hamburger
        src='/image/hamburger.jpg'
        alt='메뉴 열기/닫기'
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
                <Icon src='/image/상품 아이콘.png' alt='상품리스트 페이지' />
                상품리스트 페이지
              </Link>
            </PageItem>
            <PageItem>
              <Link to='/bookmark' onClick={handleModalOpenClose}>
                <Icon src='/image/북마크 아이콘.png' alt='북마크 페이지' />
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
