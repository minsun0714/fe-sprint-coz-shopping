import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  ItemBox,
  Item,
  ItemImg,
  ItemInfo,
  LeftInfo,
  RightInfo,
  LeftUp,
  RightUp,
} from "../Home/Main";
import FilterBtn from "./FilterBtn";
import axios from "axios";
import { getAllProducts } from "../../store/productsStore";
import { RootState } from "../../store/rootStore";
import {
  addBookMarkedProducts,
  deleteBookMarkedProduct,
} from "../../store/bookMarkStore";
import { IItem } from "../Home/Main";

export const ProductListMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 84vh;
`;

export const Section = styled.section`
  margin: 0 20px 0px;
  padding-bottom: 100px;
`;

interface IImageProps {
  id: any;
}

const enum BookMarkIcon {
  onIcon = "/image/bookmark_on.jpg",
  offIcon = "/image/bookmark_off.jpg",
}

export const BookMarkStar = styled.div<IImageProps>`
  background-image: ${(props: IImageProps): string => {
    const bookMarkedProducts = useSelector(
      (store: RootState) => store.bookMarkedProducts
    );
    const isBookMarked = bookMarkedProducts.find(
      (product: IItem) => product.id === props.id
    );
    const imageUrl = isBookMarked ? BookMarkIcon.onIcon : BookMarkIcon.offIcon;
    return `url(${imageUrl})`;
  }};
  border: none;
  height: 24px;
  width: 25px;
  margin-top: -90px;
  margin-left: 260px;
  z-index: 0.5;
  cursor: pointer;
`;

function ProductList() {
  const [items, setItems] = useState<IItem[]>([]);
  const dispatch = useDispatch();
  const products = useSelector((store: RootState) => store.products);
  const bookMarkedProducts = useSelector(
    (store: RootState) => store.bookMarkedProducts
  );

  const onClickBookMark = (id: number) => {
    const bookMarkedTargetItem = bookMarkedProducts.find(
      (product: IItem) => product.id === id
    );
    if (!bookMarkedTargetItem) {
      const targetItem = products.find((product: IItem) => product.id === id);
      if (targetItem) dispatch(addBookMarkedProducts(targetItem));
    } else dispatch(deleteBookMarkedProduct(bookMarkedTargetItem));
  };

  useEffect(() => {
    if (products.length === 0) {
      axios
        .get("http://cozshopping.codestates-seb.link/api/v1/products")
        .then((response) => {
          dispatch(getAllProducts(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
                id={item.id}
                onClick={() => onClickBookMark(item.id)}
              ></BookMarkStar>
              <ItemInfo>
                <LeftInfo>
                  <LeftUp>
                    {item.type === "Category"
                      ? "# " + item.title
                      : item.title || item.brand_name}
                  </LeftUp>
                  <span>{item.sub_title}</span>
                </LeftInfo>
                <RightInfo>
                  <RightUp discount={item.discountPercentage}>
                    {item.brand_name
                      ? "관심고객수"
                      : item.discountPercentage
                      ? item.discountPercentage + "%"
                      : ""}
                  </RightUp>
                  <span>
                    {item.brand_name
                      ? Number(item.follower).toLocaleString()
                      : item.price
                      ? Number(item.price).toLocaleString() + "원"
                      : ""}
                  </span>
                </RightInfo>
              </ItemInfo>
            </Item>
          ))}
        </ItemBox>
      </Section>
    </ProductListMainWrapper>
  );
}
export default ProductList;
