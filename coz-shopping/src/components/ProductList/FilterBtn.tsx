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

enum FilterBtnIcon {
  Whole = "/image/버튼 전체.png",
  Product = "/image/버튼 상품.png",
  Category = "/image/버튼 카테고리.png",
  Exhibition = "/image/버튼 기획전.png",
  Brand = "/image/버튼 브랜드.png",
}

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
