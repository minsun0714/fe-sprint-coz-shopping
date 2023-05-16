import { createGlobalStyle } from "styled-components";
import normalize from "normalize.css";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
*{
  box-sizing: border-box;
}
`;
