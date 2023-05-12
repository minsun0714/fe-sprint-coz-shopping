import React from "react";
import styled from "styled-components";

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
  return (
    <HeaderWrapper>
      <CodeStatesLogo src='./image/로고.png'></CodeStatesLogo>
      <COZShopping src='./image/쇼핑몰 이름.jpg'></COZShopping>
      <Hamburger src='./image/hamburger.jpg'></Hamburger>
    </HeaderWrapper>
  );
}

export default Header;
