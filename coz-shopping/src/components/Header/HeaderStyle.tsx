import styled from "styled-components";

export const modalStyle: ReactModal.Styles = {
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

export const HeaderWrapper = styled.header`
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

export const CodeStatesLogo = styled.img`
  position: fixed;
  height: 45px;
  padding: 10px 10px 10px 19vw;
  margin-top: 10px;
  @media (max-width: 1500px) {
    padding: 10px 20vw 0 154px;
    height: 33px;
  }
`;

export const COZShopping = styled.img`
  position: fixed;
  height: 45px;
  padding: 13px 10px 10px 24vw;
  margin-top: 14px;
  @media (max-width: 1500px) {
    padding: 10px 20vw 0 240px;
    height: 33px;
  }
`;

export const Hamburger = styled.img`
  height: 20px;
  margin: 25px 21vw 0 auto;
  cursor: pointer;
  @media (max-width: 1500px) {
    margin: 20px 5vw 0 87vw;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const PageMenu = styled.ul`
  margin: 0;
  padding: 0 0 0 0px;
  list-style: none;
`;

export const Greeting = styled.p`
  text-align: center;
  margin-top: 23px;
`;

export const PageItem = styled.li`
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

export const Icon = styled.img`
  margin-right: 10px;
`;
