import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  MainWrapper,
  ItemBox,
  Item,
  ItemImg,
  BookMarkStar,
} from "../Home/Main";
import FilterBtn from "./FilterBtn";
import axios from "axios";
import { storeAllProducts } from "../../store/productsStore";
import { onClickBookMark } from "../../onClickBookMark";
import { RootState } from "../../store/rootStore";

export const ProductListMainWrapper = styled(MainWrapper)`
  flex-direction: column;
  height: 84vh;
`;

const Section = styled.section`
  margin: 0px 0px 10px;
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

function ProductList() {
  const [items, setItems] = useState<IItem[]>([]);
  const dispatch = useDispatch();
  const products = useSelector((store: RootState) => store.products);
  console.log(products.length);

  useEffect(() => {
    axios
      .get("http://cozshopping.codestates-seb.link/api/v1/products")
      .then((response) => {
        dispatch(storeAllProducts(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setItems(products);
  }, [products]);

  return (
    <ProductListMainWrapper>
      <FilterBtn setFilteredItems={setItems} />
      <Section>
        <ItemBox>
          {items?.map((item: IItem) => (
            <Item key={item.id}>
              <ItemImg src={item.image_url || item.brand_image_url}></ItemImg>
              <BookMarkStar
                src='/image/북마크 아이콘 - off.png'
                onClick={() =>
                  onClickBookMark(item.id, item.title || item.brand_name)
                }
              ></BookMarkStar>
              <li>{item.title || item.brand_name}</li>
            </Item>
          ))}
        </ItemBox>
      </Section>
    </ProductListMainWrapper>
  );
}
export default ProductList;
