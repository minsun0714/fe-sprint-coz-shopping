import styled from "styled-components";

const ButtonsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  margin: 10px;
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

function FilterBtn() {
  return (
    <ButtonsWrapper>
      <ButtonWrapper>
        <StyledFilterBtn></StyledFilterBtn>
        <label>전체</label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn></StyledFilterBtn>
        <label>상품</label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn></StyledFilterBtn>
        <label>카테고리</label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn></StyledFilterBtn>
        <label>기획전</label>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledFilterBtn></StyledFilterBtn>
        <label>브랜드</label>
      </ButtonWrapper>
    </ButtonsWrapper>
  );
}
export default FilterBtn;
