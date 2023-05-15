import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import { BookMarkStar } from "../ProductList/ProductList";
import {
  getBookMarkedProducts,
  deleteBookMarkedProduct,
} from "../../store/bookMarkStore";

export const MainWrapper = styled.div`
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
  const products = useSelector((store: RootState) => store.products);
  const bookMarkList = useSelector((store: RootState) =>
    store.bookMarkedProducts.slice(0, 4)
  );

  const onClickBookMark = (id: number) => {
    const bookMarkedTargetItem = bookMarkList.find(
      (product: IItem) => product.id === id
    );

    if (!bookMarkedTargetItem) {
      const targetItem = products.find((product: IItem) => product.id === id);
      if (targetItem) dispatch(getBookMarkedProducts(targetItem));
    } else dispatch(deleteBookMarkedProduct(bookMarkedTargetItem));
  };

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

  return (
    <MainWrapper>
      <section>
        <h2>상품 리스트</h2>
        <ItemBox>
          {itemsList.map((item) => (
            <Item key={item.id}>
              <ItemImg src={item.image_url || item.brand_image_url}></ItemImg>
              <BookMarkStar
                id={item.id}
                onClick={() => onClickBookMark(item.id)}
              ></BookMarkStar>
              <li>{item.title || item.brand_name}</li>
            </Item>
          ))}
        </ItemBox>
      </section>

      <section>
        <h2>북마크 리스트</h2>
        <ItemBox>
          {bookMarkList.map((bookMarkedItem) => (
            <Item key={bookMarkedItem.id}>
              <ItemImg
                src={bookMarkedItem.image_url || bookMarkedItem.brand_image_url}
              ></ItemImg>
              <BookMarkStar
                id={bookMarkedItem.id}
                onClick={() => onClickBookMark(bookMarkedItem.id)}
              ></BookMarkStar>
              <li>{bookMarkedItem.title || bookMarkedItem.brand_name}</li>
            </Item>
          ))}
        </ItemBox>
      </section>
    </MainWrapper>
  );
}
export default Main;
