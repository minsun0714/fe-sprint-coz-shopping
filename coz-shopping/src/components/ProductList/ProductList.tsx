import { useState, useEffect } from "react";
import styled from "styled-components";
import { MainWrapper, ItemBox, Item, ItemImg } from "../Home/Main";
import FilterBtn from "./FilterBtn";
import axios from "axios";

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

function ProductList() {
  const [itemsList, setItemsList] = useState<IItem[]>([]);
  useEffect(() => {
    axios
      .get("http://cozshopping.codestates-seb.link/api/v1/products", {})
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
      <FilterBtn />
      <section>
        <h1>상품 리스트</h1>
        <ItemBox>
          {itemsList.map((item) => (
            <Item key={item.id}>
              <ItemImg src={item.image_url || item.brand_image_url}></ItemImg>
              <li>{item.title || item.brand_name}</li>
            </Item>
          ))}
        </ItemBox>
      </section>
    </MainWrapper>
  );
}
export default ProductList;
