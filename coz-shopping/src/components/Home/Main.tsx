import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";

export const MainWrapper = styled.header`
  border: 1px solid transparent;
  margin: none;
  height: 86vh;
  box-shadow: 0px 5px 5px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ItemBox = styled.ul`
  display: flex;
  flex-direction: row;
`;

export const Item = styled.div`
  border: 1px solid green;
  list-style-type: none;
  margin: 1vw;
`;

export const ItemImg = styled.img`
  height: 10vw;
  width: 10vw;
  margin: 30px;
  border-radius: 10px;
`;

export const BookMarkStar = styled.img``;

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

function Main() {
  const [itemsList, setItemsList] = useState<IItem[]>([]);
  const bookMarkList = useSelector((state: RootState) =>
    state.bookMarkedProducts.slice(0, 4)
  );

  useEffect(() => {
    axios
      .get("http://cozshopping.codestates-seb.link/api/v1/products", {
        params: {
          count: 4,
        },
      })
      .then((response) => {
        console.log(response.data);
        setItemsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MainWrapper>
      <section>
        <h1>상품 리스트</h1>
        <ItemBox>
          {itemsList.map((item) => (
            <Item key={item.id}>
              <ItemImg src={item.image_url || item.brand_image_url}></ItemImg>
              <BookMarkStar></BookMarkStar>
              <li>{item.title || item.brand_name}</li>
            </Item>
          ))}
        </ItemBox>
      </section>
      <section>
        <h1>북마크 리스트</h1>
        <ItemBox>
          {bookMarkList.map((bookMarkedItem) => (
            <Item key={bookMarkedItem.id}>
              <ItemImg
                src={bookMarkedItem.image_url || bookMarkedItem.brand_image_url}
              ></ItemImg>
              <BookMarkStar></BookMarkStar>
              <li>{bookMarkedItem.title || bookMarkedItem.brand_name}</li>
            </Item>
          ))}
        </ItemBox>
      </section>
    </MainWrapper>
  );
}
export default Main;
