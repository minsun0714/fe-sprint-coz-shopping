import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const MainWrapper = styled.header`
  border: 1px solid transparent;
  margin: none;
  height: 820px;
  box-shadow: 0px 5px 5px gray;
  display: flex;
  flex-direction: row;
`;

const Section = styled.section``;

const ItemBox = styled.ul`
  display: flex;
  flex-direction: row;
`;

const Item = styled.div`
  border: 1px solid green;
  list-style-type: none;
  margin: 1vw;
`;

const ItemImg = styled.img`
  height: 10vw;
  width: 10vw;
  margin: 30px;
  border-radius: 10px;
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

function Main() {
  const [itemsList, setItemsList] = useState<IItem[]>([]);

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
      <Section>
        <h1>상품 리스트</h1>
        <ItemBox>
          {itemsList.map((item) => (
            <Item key={item.id}>
              <ItemImg src={item.image_url || item.brand_image_url}></ItemImg>
              <li>{item.title || item.brand_name}</li>
            </Item>
          ))}
        </ItemBox>
      </Section>
      <section></section>
    </MainWrapper>
  );
}
export default Main;
