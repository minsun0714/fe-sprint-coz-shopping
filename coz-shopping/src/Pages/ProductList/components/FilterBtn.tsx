import React, { useState } from "react";
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
  const [typeClicked, setTypeClicked] = useState("Whole");
  const products = useSelector((store: RootState) => store.products);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.name;
    setFilteredItems(
      type !== ItemType.Whole
        ? products.filter((product: IItem) => product.type === type)
        : products
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
export default FilterBtn;
