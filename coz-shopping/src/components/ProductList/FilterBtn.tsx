import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import { IItem } from "../Home/MainStyle";
import { ItemType } from "./ProductListStyle";

export const ButtonsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 80px;
  transform: translateX(110%);
  @media (max-width: 1500px) {
    transform: translateX(73%);
  }
`;

export const ButtonWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin: 10px;
  text-align: center;
`;

export const Label = styled.label``;

const enum FilterBtnIcon {
  Whole = "/image/버튼 전체.png",
  Product = "/image/버튼 상품.png",
  Category = "/image/버튼 카테고리.png",
  Exhibition = "/image/버튼 기획전.png",
  Brand = "/image/버튼 브랜드.png",
}

interface IStyledFilteredBtn {
  name?: string;
}

export const StyledFilterBtn = styled.button<IStyledFilteredBtn>`
  background-image: ${(props) => {
    let icon;
    switch (props.name) {
      case "Product":
        icon = FilterBtnIcon.Product;
        break;
      case "Category":
        icon = FilterBtnIcon.Category;
        break;
      case "Exhibition":
        icon = FilterBtnIcon.Exhibition;
        break;
      case "Brand":
        icon = FilterBtnIcon.Brand;
        break;
      default:
        icon = FilterBtnIcon.Whole;
        break;
    }
    return `url("${icon}")`;
  }};
  border-radius: 100px;
  height: 82px;
  width: 82px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 8px;
  cursor: pointer;
`;

interface IFilteredBtn {
  setFilteredItems: (items: IItem[]) => void;
}

function FilterBtn({ setFilteredItems }: IFilteredBtn) {
  const products = useSelector((store: RootState) => store.products);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.name;
    setFilteredItems(
      type
        ? products.filter((product: IItem) => product.type === type)
        : products
    );
  };
  return (
    <ButtonsWrapper>
      <ButtonWrapper>
        <StyledFilterBtn onClick={(e) => onClick(e)}></StyledFilterBtn>
        <Label>전체</Label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name={ItemType.Product}
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <Label>상품</Label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name={ItemType.Category}
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <Label>카테고리</Label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name={ItemType.Exhibition}
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <Label>기획전</Label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name={ItemType.Brand}
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <Label>브랜드</Label>
      </ButtonWrapper>
    </ButtonsWrapper>
  );
}
export default FilterBtn;
