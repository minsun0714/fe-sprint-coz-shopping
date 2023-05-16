import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import { IItem } from "../Home/Main";

export const ButtonsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 80px;
  transform: translateX(110%);
`;

export const ButtonWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin: 10px;
  text-align: center;
`;

enum FilterBtnIcon {
  Whole = "/image/버튼 전체.png",
  Product = "/image/버튼 상품.png",
  Category = "/image/버튼 카테고리.png",
  Exhibition = "/image/버튼 기획전.png",
  Brand = "/image/버튼 브랜드.png",
}

export const StyledFilterBtn = styled.button`
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
        <label>전체</label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name='Product'
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <label>상품</label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name='Category'
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <label>카테고리</label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name='Exhibition'
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <label>기획전</label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn
          name='Brand'
          onClick={(e) => onClick(e)}
        ></StyledFilterBtn>
        <label>브랜드</label>
      </ButtonWrapper>
    </ButtonsWrapper>
  );
}
export default FilterBtn;
