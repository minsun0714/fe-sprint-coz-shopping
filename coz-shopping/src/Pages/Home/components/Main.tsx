import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootStore";
import { MainWrapper, Section, H2, ItemBox, Item, ItemImg } from "../MainStyle";
import { IItem } from "../MainType";
import {
  BookMarkStar,
  modalStyle,
  ModalImg,
  ModalDetail,
  XSign,
  BookMarkStarModal,
  ModalTitle,
} from "../../ProductList/ProductListStyle";
import { IModalDetail } from "../../ProductList/ProductListType";
import { addBookMark, deleteBookMark } from "../../../store/bookMarkStore";
import ReactModal from "react-modal";
import ItemDetail from "../../ProductList/components/ItemInfo";
import ItemContainer from "../../ProductList/components/ItemContainer";
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
        <ItemContainer items={itemsList} />
      </Section>
      <Section>
        <H2>북마크 리스트</H2>
        <ItemContainer items={showFourBookMarked} />
      </Section>
    </MainWrapper>
  );
}
export default Main;
