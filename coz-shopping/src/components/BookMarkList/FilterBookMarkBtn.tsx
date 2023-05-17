import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import {
  ButtonsWrapper,
  ButtonWrapper,
  StyledFilterBtn,
  Label,
} from "../ProductList/FilterBtn";
import { IItem } from "../Home/Main";

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
          name='Product'
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <Label>상품</Label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name='Category'
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <Label>카테고리</Label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name='Exhibition'
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <Label>기획전</Label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name='Brand'
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <Label>브랜드</Label>
      </ButtonWrapper>
    </ButtonsWrapper>
  );
}
export default FilterBookMarkBtn;
