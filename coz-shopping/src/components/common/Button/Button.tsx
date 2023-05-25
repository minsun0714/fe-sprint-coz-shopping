import React from "react";
import styled from "styled-components";
import globalToken from "../../../tokens/global.json";
import { FilterBtnType } from "./Button.stories";

const { ButtonText, BorderRadius, ButtonSize, ButtonSpacing } = globalToken;

interface IButton {
  buttonType: string;
}

const ButtonWrapper = styled.button<IButton>`
  border-radius: ${BorderRadius.value}px;
  height: ${ButtonSize.value}px;
  width: ${ButtonSize.value}px;
  border: 1px solid rgba(0, 0, 0, 0.1);
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
