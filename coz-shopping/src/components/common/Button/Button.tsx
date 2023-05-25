import React from "react";
import styled from "styled-components";
import globalToken from "../../../tokens/global.json";
import { FilterBtnType } from "./Button.stories";
import { FilterBtnIcon } from "../../../Pages/ProductList/ProductListType";

const { ButtonText, BorderRadius, ButtonSize, ButtonSpacing } = globalToken;

interface IButton {
  buttonType: FilterBtnType;
}

const ButtonWrapper = styled.button<IButton>`
  border-radius: ${BorderRadius.value}px;
  height: ${ButtonSize.value}px;
  width: ${ButtonSize.value}px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  background-image: ${(props) => {
    let icon;
    switch (props.buttonType) {
      case FilterBtnType.Product:
        icon = FilterBtnIcon.Product;
        break;
      case FilterBtnType.Category:
        icon = FilterBtnIcon.Category;
        break;
      case FilterBtnType.Exhibition:
        icon = FilterBtnIcon.Exhibition;
        break;
      case FilterBtnType.Brand:
        icon = FilterBtnIcon.Brand;
        break;
      default:
        icon = FilterBtnIcon.Whole;
        break;
    }
    return `url("${icon}")`;
  }};
`;

interface ILabelText {
  isClicked: boolean;
  buttonType: FilterBtnType;
}

const LabelText = styled.h4<ILabelText>``;

export default function Button({
  task: { id, title, buttonType, isClicked },
  onArchiveTask,
  onPinTask,
}: any) {
  return (
    <div>
      <ButtonWrapper buttonType={buttonType} />
      <LabelText
        children={buttonType}
        isClicked={isClicked}
        buttonType={buttonType}
      />
    </div>
  );
}
