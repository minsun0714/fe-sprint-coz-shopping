import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";

const ButtonsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFilterBtn = styled.button`
  border-radius: 100px;
  height: 60px;
  width: 60px;
  border: none;
  margin: 8px;
`;

interface IItem {
  brand_image_url?: string;
  brand_name: string | null;
  discountPercentage: number | null;
  follower: number;
  id: number;
  image_url: string | null;
  price: string | null;
  sub_title: string | null;
  title: string | null;
  type: string;
}

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
