import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import { BookMarkStar } from "../ProductList/ProductList";
import {
  addBookMarkedProducts,
  deleteBookMarkedProduct,
} from "../../store/bookMarkStore";

export const MainWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 87vh;
  box-shadow: 0px 3px 4px gray;
  margin-top: 120px;
`;

const H2 = styled.h2`
  font-size: 24px;
  margin-left: 320px;
`;

export const ItemBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-content: flex-start;
  margin-left: 13vw;
  margin-right: 10vw;
`;

export const Item = styled.span`
  border: 1px dotted gray;
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

export const ItemImg = styled.img`
  height: 210px;
  width: 264px;
  border-radius: 20px;
  margin: 0 0 50px 40px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 30px;
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
      <section>
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
                <span>{item.title || item.brand_name}</span>
              </ItemInfo>
            </Item>
          ))}
        </ItemBox>
      </section>
      <section>
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
                <span>{bookMarkedItem.title || bookMarkedItem.brand_name}</span>
              </ItemInfo>
            </Item>
          ))}
        </ItemBox>
      </section>
    </MainWrapper>
  );
}
export default Main;
