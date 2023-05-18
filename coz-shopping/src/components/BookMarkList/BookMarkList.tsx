import React, { useState } from "react";
import {
  Item,
  ItemImg,
  ItemBox,
  ItemInfo,
  LeftInfo,
  RightInfo,
  LeftUp,
  RightUp,
} from "../Home/MainStyle";
import FilterBookMarkBtn from "../BookMarkList/FilterBookMarkBtn";
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
  IModalDetail,
} from "../ProductList/ProductListStyle";
import { IItem } from "../Home/MainStyle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import {
  addBookMarkedProducts,
  deleteBookMarkedProduct,
} from "../../store/bookMarkStore";
import { ItemType } from "../Home/MainStyle";
import ReactModal from "react-modal";
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
    <ProductListMainWrapper>
      <FilterBookMarkBtn
        setFilteredItems={setItems}
        bookMarkedProducts={bookMarkedProducts}
      />
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
    </ProductListMainWrapper>
  );
}
export default BookMarkList;
