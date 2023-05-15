import styled from "styled-components";

const FooterWrapper = styled.footer`
  position: sticky;
  border: 1px solid transparent;
  margin: none;
  height: 60px;
  box-shadow: 0px 5px 5px gray;
  display: flex;
  flex-direction: column;
`;

const FooterContent = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 88.02%;
  display: inline-block;
  color: #888888;
  text-align: center;
  margin-bottom: -10px;
  margin-top: 15px;
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>개인정보 처리방침 | 이용약관</FooterContent>
      <FooterContent>All rights reserved @ CodeStates</FooterContent>
    </FooterWrapper>
  );
}

export default Footer;
