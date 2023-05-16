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
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-shadow: 0px 3px 4px gray;
  margin: 70px 0 66px;
`;

const H2 = styled.h2`
  font-size: 24px;
  margin-left: 350px;
  margin-bottom: -20px;
`;

export const ItemBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-content: flex-start;
  margin: 10px 370px 0 260px;
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
      </section>
    </MainWrapper>
  );
}
export default Main;
