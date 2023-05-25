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
} from "../HeaderStyle";
import { IHeaderUrl } from "../HeaderType";
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
          src={IHeaderUrl.CodeStatesLogo}
          alt='코드스테이츠 로고'
        ></CodeStatesLogo>
        <COZShopping
          src={IHeaderUrl.ShoppingMallName}
          alt='쇼핑몰 이름 코즈 쇼핑'
        ></COZShopping>
      </Link>
      <Hamburger
        src={IHeaderUrl.Hamburger}
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
                <Icon src={IHeaderUrl.Product} alt='상품리스트 페이지' />
                상품리스트 페이지
              </Link>
            </PageItem>
            <PageItem>
              <Link to='/bookmark' onClick={handleModalOpenClose}>
                <Icon src={IHeaderUrl.BookMark} alt='북마크 페이지' />
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
