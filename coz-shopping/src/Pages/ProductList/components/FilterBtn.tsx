import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootStore";
import { IItem } from "../../Home/MainType";
import { ItemType, IFilteredBtn } from "../ProductListType";
import {
  ButtonsWrapper,
  ButtonWrapper,
  Label,
  StyledFilterBtn,
} from "../ProductListStyle";

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
