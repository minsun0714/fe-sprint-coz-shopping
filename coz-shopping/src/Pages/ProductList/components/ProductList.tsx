import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ItemBox,
  Item,
  ItemImg,
  ItemInfo,
  LeftInfo,
  RightInfo,
  LeftUp,
  RightUp,
} from "../../Home/MainStyle";
import FilterBtn from "./FilterBtn";
import axios from "axios";
import { getAllProducts } from "../../../store/productsStore";
import { RootState } from "../../../store/rootStore";
import { addBookMark, deleteBookMark } from "../../../store/bookMarkStore";
import { IItem } from "../../Home/MainType";
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
} from "../ProductListStyle";
import { IModalDetail } from "../ProductListType";
import ReactModal from "react-modal";
import { ItemType } from "../ProductListType";
import ItemDetail from "./ItemInfo";
ReactModal.setAppElement("#root");

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
      if (targetItem) dispatch(addBookMark(targetItem));
    } else dispatch(deleteBookMark(bookMarkedTargetItem));
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
      <FilterBtn products={products} setFilteredItems={setItems} />
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
        <ItemBox>
          {items?.map((item: IItem) => (
            <Item key={item.id}>
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
            </Item>
          ))}
        </ItemBox>
      </Section>
    </ProductListMainWrapper>
  );
}
export default ProductList;
