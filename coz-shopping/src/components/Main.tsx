import styled from "styled-components";
import axios from "axios";

const MainWrapper = styled.header`
  border: 1px solid transparent;
  margin: none;
  height: 820px;
  box-shadow: 0px 5px 5px gray;
  display: flex;
  flex-direction: row;
`;

function Main() {
  return <MainWrapper></MainWrapper>;
}
export default Main;
