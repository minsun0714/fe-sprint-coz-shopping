import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import {
  MainWrapper,
  Section,
  H2,
  ItemsWrapper,
  ItemBox,
  ItemImg,
} from "./MainStyle";
import { IItem } from "./MainType";
import {
  BookMarkStar,
  modalStyle,
  ModalImg,
  ModalDetail,
  XSign,
  BookMarkStarModal,
  ModalTitle,
} from "../ProductList/ProductListStyle";
import { IModalDetail } from "../ProductList/ProductListType";
import { addBookMark, deleteBookMark } from "../../store/bookMarkStore";
import ReactModal from "react-modal";
import ItemDetail from "../../components/ItemInfo";
import useFetch from "../../util/useFetch";
ReactModal.setAppElement("#root");

function Main() {
  const products = useFetch();
  const showFourProducts = products.slice(0, 4);
  const bookMarkedProducts = useSelector(
    (store: RootState) => store.bookMarkedProducts
  );
  const showFourBookMarkedProducts = bookMarkedProducts.slice(0, 4);

  const dispatch = useDispatch();

  const onClickBookMark = (id: number) => {
    const bookMarkedTargetItem = bookMarkedProducts.find(
      (product: IItem) => product.id === id
    );

    if (!bookMarkedTargetItem) {
      const targetItem = showFourProducts.find(
        (product: IItem) => product.id === id
      );
      if (targetItem) dispatch(addBookMark(targetItem));
    } else dispatch(deleteBookMark(bookMarkedTargetItem));
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
        <ItemsWrapper>
          {showFourProducts.map((item) => (
            <ItemBox key={item.id}>
              <ItemImg
                src={item.image_url || item.brand_image_url}
                onClick={() =>
                  handleModalOpenClose(
                    item.id,
                    item.title || item.brand_name,
                    item.image_url || item.brand_image_url
                  )
                }
              />
              <BookMarkStar
                id={item.id}
                onClick={() => onClickBookMark(item.id)}
              />
              <ItemDetail item={item} />
            </ItemBox>
          ))}
        </ItemsWrapper>
      </Section>
      <Section>
        <H2>북마크 리스트</H2>
        <ItemsWrapper>
          {showFourBookMarkedProducts.map((bookMarkedItem) => (
            <ItemBox key={bookMarkedItem.id}>
              <ItemImg
                src={bookMarkedItem.image_url || bookMarkedItem.brand_image_url}
                onClick={() =>
                  handleModalOpenClose(
                    bookMarkedItem.id,
                    bookMarkedItem.title || bookMarkedItem.brand_name,
                    bookMarkedItem.image_url || bookMarkedItem.brand_image_url
                  )
                }
              />
              <BookMarkStar
                id={bookMarkedItem.id}
                onClick={() => onClickBookMark(bookMarkedItem.id)}
              />
              <ItemDetail item={bookMarkedItem} />
            </ItemBox>
          ))}
        </ItemsWrapper>
      </Section>
    </MainWrapper>
  );
}
export default Main;
