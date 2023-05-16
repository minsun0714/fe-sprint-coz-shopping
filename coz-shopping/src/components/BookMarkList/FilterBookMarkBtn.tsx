import { useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import {
  ButtonsWrapper,
  ButtonWrapper,
  StyledFilterBtn,
} from "../ProductList/FilterBtn";
import { IItem } from "../Home/Main";

interface IFilteredBtn {
  setFilteredItems: (items: IItem[]) => void;
}

function FilterBookMarkBtn({ setFilteredItems }: IFilteredBtn) {
  const bookMarkStore = useSelector(
    (store: RootState) => store.bookMarkedProducts
  );

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.name;
    setFilteredItems(
      type
        ? bookMarkStore.filter((product: IItem) => product.type === type)
        : bookMarkStore
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
export default FilterBookMarkBtn;
