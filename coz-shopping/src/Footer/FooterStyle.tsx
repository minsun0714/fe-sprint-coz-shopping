import styled from "styled-components";

export const FooterWrapper = styled.footer`
  position: fixed;
  background-color: white;
  bottom: 0;
  height: 63px;
  width: 100vw;
  box-shadow: 0px 3px 15px gray;
  display: flex;
  flex-direction: column;
  z-index: 9999;
`;

export const FooterContent = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 88.02%;
  display: inline-block;
  color: #888888;
  text-align: center;
  margin-bottom: -10px;
  margin-top: 19px;
`;
