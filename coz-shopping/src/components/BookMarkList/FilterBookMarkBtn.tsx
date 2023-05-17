import React from "react";
import {
  ButtonsWrapper,
  ButtonWrapper,
  StyledFilterBtn,
  Label,
} from "../ProductList/FilterBtn";
import { IItem } from "../Home/MainStyle";
import { ItemType } from "../ProductList/ProductListStyle";

interface IFilteredBtn {
  setFilteredItems: (items: IItem[]) => void;
  bookMarkedProducts: IItem[];
}

function FilterBookMarkBtn({
  setFilteredItems,
  bookMarkedProducts,
}: IFilteredBtn) {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.name;
    setFilteredItems(
      type
        ? bookMarkedProducts.filter((product: IItem) => product.type === type)
        : bookMarkedProducts
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
export default FilterBookMarkBtn;
