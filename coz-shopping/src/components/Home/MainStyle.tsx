import styled from "styled-components";

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-shadow: 0px 3px 4px gray;
  margin: 70px 0 66px 0;
  padding-right: 0;
`;

export const Section = styled.section``;

export const H2 = styled.h2`
  font-size: 24px;
  margin-left: 350px;
  margin-bottom: -20px;
  @media (max-width: 1500px) {
    margin: 29px 0 -20px 130px;
  }
`;

export const ItemBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-content: flex-start;
  margin: 10px 370px 0 260px;
  @media (max-width: 1500px) {
    margin: 10px 20vw 0 40px;
  }
`;

export const Item = styled.span`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

export const ItemImg = styled.img`
  height: 210px;
  width: 264px;
  border-radius: 20px;
  margin: 10px 0 50px 40px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 32px 0;
`;

export const LeftInfo = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: -20px;
`;

export const LeftUp = styled.h4`
  margin-bottom: 7px;
`;

export const RightInfo = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: -20px;
  margin-top: -20px;
`;

export interface IRightUp {
  discount: number | null;
}

export const RightUp = styled.h4<IRightUp>`
  color: ${(props) => {
    return props.discount ? "purple" : null;
  }};
  margin-bottom: 7px;
  margin-left: auto;
`;

export interface IItem {
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
