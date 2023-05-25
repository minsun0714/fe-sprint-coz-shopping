import React, { useState } from "react";
import { ItemBox, ItemImg, ItemsWrapper } from "../../Home/MainStyle";
import {
  ProductListMainWrapper,
  BookMarkStar,
  Section,
  ModalImg,
  modalStyle,
  ModalDetail,
  ModalTitle,
  BookMarkStarModal,
  XSign,
} from "../../ProductList/ProductListStyle";
import { IModalDetail } from "../../ProductList/ProductListType";
import { IItem } from "../../Home/MainType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootStore";
import { addBookMark, deleteBookMark } from "../../../store/bookMarkStore";
import ReactModal from "react-modal";
import FilterBtn from "../../ProductList/components/FilterBtn";
import ItemDetail from "../../ProductList/components/ItemInfo";
ReactModal.setAppElement("#root");

function BookMarkList() {
  const bookMarkedProducts = useSelector(
    (store: RootState) => store.bookMarkedProducts
  );
  const [items, setItems] = useState<IItem[]>(bookMarkedProducts);
  const dispatch = useDispatch();
  const products = useSelector((store: RootState) => store.products);

  const onClickBookMark = (id: number) => {
    const bookMarkedTargetItem = bookMarkedProducts.find(
      (product: IItem) => product.id === id
    );

    if (!bookMarkedTargetItem) {
      const targetItem = products.find((product: IItem) => product.id === id);
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
    <ProductListMainWrapper>
      <FilterBtn setFilteredItems={setItems} products={bookMarkedProducts} />
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => handleModalOpenClose()}
        style={modalStyle}
      >
        <ModalDetail>
          <XSign src='/image/x.png' onClick={() => handleModalOpenClose()} />
          <ModalImg src={modalDetail.url} alt='' />
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
        <ItemsWrapper>
          {items?.map((item: IItem) => (
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
              ></BookMarkStar>
              <ItemDetail item={item} />
            </ItemBox>
          ))}
        </ItemsWrapper>
      </Section>
    </ProductListMainWrapper>
  );
}
export default BookMarkList;
