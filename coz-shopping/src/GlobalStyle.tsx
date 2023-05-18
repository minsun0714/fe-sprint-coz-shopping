import { createGlobalStyle } from "styled-components";
import normalize from "normalize.css";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
*{
  box-sizing: border-box;
}
`;

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 330px;
    height: 480px;
  }
  .Toastify__toast {
    background-color: transparent;
    box-shadow: none;
    margin-top: -25px;
  }
  .Toastify__toast-body {
    background-color: transparent;
  }
  .Toastify__progress-bar {
    border: 10px solid transparent;
  }
`;

export const ToastImg = styled.img`
  height: 65px;
  margin-bottom: -20px;
`;

export type ToastAction = "add" | "delete";
