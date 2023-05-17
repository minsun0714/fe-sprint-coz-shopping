import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import {
  MainWrapper,
  Section,
  H2,
  ItemBox,
  Item,
  ItemImg,
  ItemInfo,
  LeftInfo,
  LeftUp,
  RightInfo,
  RightUp,
  IRightUp,
  IItem,
} from "./MainStyle";
import { BookMarkStar } from "../ProductList/ProductListStyle";
import {
  addBookMarkedProducts,
  deleteBookMarkedProduct,
} from "../../store/bookMarkStore";

function Main() {
  const [itemsList, setItemsList] = useState<IItem[]>([]);
  const dispatch = useDispatch();
  const bookMarkedProducts = useSelector(
    (store: RootState) => store.bookMarkedProducts
  );
  const showFourBookMarked = bookMarkedProducts.slice(0, 4);

  useEffect(() => {
    axios
      .get("http://cozshopping.codestates-seb.link/api/v1/products", {
        params: {
          count: 4,
        },
      })
      .then((response) => {
        setItemsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickBookMark = (id: number) => {
    const bookMarkedTargetItem = bookMarkedProducts.find(
      (product: IItem) => product.id === id
    );

    if (!bookMarkedTargetItem) {
      const targetItem = itemsList.find((product: IItem) => product.id === id);
      if (targetItem) dispatch(addBookMarkedProducts(targetItem));
    } else dispatch(deleteBookMarkedProduct(bookMarkedTargetItem));
  };

  return (
    <MainWrapper>
      <Section>
        <H2>상품 리스트</H2>
        <ItemBox>
          {itemsList.map((item) => (
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
      <Section>
        <H2>북마크 리스트</H2>
        <ItemBox>
          {showFourBookMarked.map((bookMarkedItem) => (
            <Item key={bookMarkedItem.id}>
              <ItemImg
                src={bookMarkedItem.image_url || bookMarkedItem.brand_image_url}
              ></ItemImg>
              <BookMarkStar
                id={bookMarkedItem.id}
                onClick={() => onClickBookMark(bookMarkedItem.id)}
              ></BookMarkStar>
              <ItemInfo>
                <LeftInfo>
                  <LeftUp>
                    {bookMarkedItem.type === "Category"
                      ? "# " + bookMarkedItem.title
                      : bookMarkedItem.title || bookMarkedItem.brand_name}
                  </LeftUp>
                  <span>{bookMarkedItem.sub_title}</span>
                </LeftInfo>
                <RightInfo>
                  <RightUp discount={bookMarkedItem.discountPercentage}>
                    {bookMarkedItem.brand_name
                      ? "관심고객수"
                      : bookMarkedItem.discountPercentage
                      ? bookMarkedItem.discountPercentage + "%"
                      : ""}
                  </RightUp>
                  <span>
                    {bookMarkedItem.brand_name
                      ? Number(bookMarkedItem.follower).toLocaleString()
                      : bookMarkedItem.price
                      ? Number(bookMarkedItem.price).toLocaleString() + "원"
                      : ""}
                  </span>
                </RightInfo>
              </ItemInfo>
            </Item>
          ))}
        </ItemBox>
      </Section>
    </MainWrapper>
  );
}
export default Main;
