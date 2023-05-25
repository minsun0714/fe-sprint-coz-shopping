import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Task from "./Button";
import { IFilteredBtn } from "../../../Pages/ProductList/ProductListType";
import FilterBtn from "../../FilterBtn";

const meta: Meta<typeof Task> = {
  component: Task,
  title: "Task",
};

export default meta;

type Story = StoryObj<typeof Task>;

export const enum FilterBtnType {
  Whole = "전체",
  Product = "상품",
  Category = "카테고리",
  Brand = "브랜드",
  Exhibition = "기획전",
}

export const Default: Story = {
  args: {
    task: {
      id: 1,
      title: "Button",
      buttonType: FilterBtnType.Whole,
      isClicked: false,
    },
  },
};
export const Clicked: Story = {
  args: {
    task: {
      id: 2,
      title: "Button",
      buttonType: FilterBtnType.Whole,
      isClicked: true,
    },
  },
};
