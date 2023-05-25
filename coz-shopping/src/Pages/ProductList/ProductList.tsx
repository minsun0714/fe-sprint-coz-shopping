import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemsWrapper, ItemBox, ItemImg } from "../Home/MainStyle";
import FilterBtn from "../../components/FilterBtn";
import { RootState } from "../../store/rootStore";
import { addBookMark, deleteBookMark } from "../../store/bookMarkStore";
import { IItem } from "../Home/MainType";
import {
  ProductListMainWrapper,
  Section,
  ModalDetail,
  BookMarkStar,
  BookMarkStarModal,
  modalStyle,
  ModalImg,
  ModalTitle,
  XSign,
} from "./ProductListStyle";
import { IModalDetail } from "./ProductListType";
import ReactModal from "react-modal";
import ItemDetail from "../../components/ItemInfo";
import useFetch from "../../util/useFetch";
ReactModal.setAppElement("#root");

function ProductList() {
  const products = useFetch();
  const [filteredItems, setFilteredItems] = useState<IItem[]>(products);
  const bookMarkedProducts = useSelector(
    (store: RootState) => store.bookMarkedProducts
  );

  useEffect(() => {
    setFilteredItems(products);
  }, [products]);

  const dispatch = useDispatch();

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
      <FilterBtn products={products} setFilteredItems={setFilteredItems} />
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
        <ItemsWrapper>
          {filteredItems?.map((item: IItem) => (
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
    </ProductListMainWrapper>
  );
}
export default ProductList;
