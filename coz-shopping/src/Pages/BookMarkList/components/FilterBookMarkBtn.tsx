import React, { useState } from "react";
import {
  ButtonsWrapper,
  ButtonWrapper,
  StyledFilterBtn,
  Label,
} from "../../ProductList/ProductListStyle";
import { IItem } from "../../Home/MainType";
import { ItemType } from "../../ProductList/ProductListType";

export interface IFilteredBtn {
  setFilteredItems: (items: IItem[]) => void;
  bookMarkedProducts: IItem[];
}

function FilterBookMarkBtn({
  setFilteredItems,
  bookMarkedProducts,
}: IFilteredBtn) {
  const [typeClicked, setTypeClicked] = useState("Whole");

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.name;
    setFilteredItems(
      type !== ItemType.Whole
        ? bookMarkedProducts.filter((product: IItem) => product.type === type)
        : bookMarkedProducts
    );
    setTypeClicked(type);
  };

  return (
    <ButtonsWrapper>
      <ButtonWrapper>
        <StyledFilterBtn name={ItemType.Whole} onClick={(e) => onClick(e)} />
        <Label typeClicked={typeClicked === ItemType.Whole}>전체</Label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn name={ItemType.Product} onClick={(e) => onClick(e)} />
        <Label typeClicked={typeClicked === ItemType.Product}>상품</Label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn name={ItemType.Category} onClick={(e) => onClick(e)} />
        <Label typeClicked={typeClicked === ItemType.Category}>카테고리</Label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name={ItemType.Exhibition}
          onClick={(e) => onClick(e)}
        />
        <Label typeClicked={typeClicked === ItemType.Exhibition}>기획전</Label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn name={ItemType.Brand} onClick={(e) => onClick(e)} />
        <Label typeClicked={typeClicked === ItemType.Brand}>브랜드</Label>
      </ButtonWrapper>
    </ButtonsWrapper>
  );
}
export default FilterBookMarkBtn;
