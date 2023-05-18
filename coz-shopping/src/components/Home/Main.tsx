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
import {
  BookMarkStar,
  modalStyle,
  ModalImg,
  ModalDetail,
  XSign,
  BookMarkStarModal,
  ModalTitle,
  IModalDetail,
} from "../ProductList/ProductListStyle";
import {
  addBookMarkedProducts,
  deleteBookMarkedProduct,
} from "../../store/bookMarkStore";
import ReactModal from "react-modal";
import { ItemType } from "../Home/MainStyle";
ReactModal.setAppElement("#root");

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState<IModalDetail>({
    id: undefined,
    title: undefined,
    url: undefined,
  });

  const handleModalOpenClose = (
    id?: number,
    title?: string | null,
    url?: string
  ) => {
    setIsModalOpen((prev) => !prev);
    setModalDetail({ id, title, url });
  };

  return (
    <MainWrapper>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => handleModalOpenClose()}
        style={modalStyle}
      >
        <ModalDetail>
          <XSign src='/image/x.png' onClick={() => handleModalOpenClose()} />
          <ModalImg src={modalDetail.url} alt='Large Image' />
          <BookMarkStarModal
            id={modalDetail.id}
            onClick={() => {
              if (modalDetail.id) {
                onClickBookMark(modalDetail.id);
              }
            }}
          />
          <ModalTitle>{modalDetail.title}</ModalTitle>
        </ModalDetail>
      </ReactModal>
      <Section>
        <H2>상품 리스트</H2>
        <ItemBox>
          {itemsList.map((item) => (
            <Item
              key={item.id}
              onClick={() =>
                handleModalOpenClose(
                  item.id,
                  item.title || item.brand_name,
                  item.image_url || item.brand_image_url
                )
              }
            >
              <ItemImg src={item.image_url || item.brand_image_url}></ItemImg>
              <BookMarkStar
                id={item.id}
                onClick={() => onClickBookMark(item.id)}
              ></BookMarkStar>
              <ItemInfo>
                <LeftInfo>
                  <LeftUp>
                    {item.type === ItemType.Category
                      ? "# " + item.title
                      : item.title || item.brand_name}
                  </LeftUp>
                  <span>{item.sub_title}</span>
                </LeftInfo>
                <RightInfo>
                  <RightUp discount={item.discountPercentage}>
                    {item.type === ItemType.Brand
                      ? "관심고객수"
                      : item.discountPercentage
                      ? item.discountPercentage + "%"
                      : ""}
                  </RightUp>
                  <span>
                    {item.type === ItemType.Brand
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
            <Item
              key={bookMarkedItem.id}
              onClick={() =>
                handleModalOpenClose(
                  bookMarkedItem.id,
                  bookMarkedItem.title || bookMarkedItem.brand_name,
                  bookMarkedItem.image_url || bookMarkedItem.brand_image_url
                )
              }
            >
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
                    {bookMarkedItem.type === ItemType.Category
                      ? "# " + bookMarkedItem.title
                      : bookMarkedItem.title || bookMarkedItem.brand_name}
                  </LeftUp>
                  <span>{bookMarkedItem.sub_title}</span>
                </LeftInfo>
                <RightInfo>
                  <RightUp discount={bookMarkedItem.discountPercentage}>
                    {bookMarkedItem.type === ItemType.Brand
                      ? "관심고객수"
                      : bookMarkedItem.discountPercentage
                      ? bookMarkedItem.discountPercentage + "%"
                      : ""}
                  </RightUp>
                  <span>
                    {bookMarkedItem.type === ItemType.Brand
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
