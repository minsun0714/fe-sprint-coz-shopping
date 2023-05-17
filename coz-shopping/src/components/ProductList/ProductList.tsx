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
} from "../Home/MainStyle";
import FilterBtn from "./FilterBtn";
import axios from "axios";
import { getAllProducts } from "../../store/productsStore";
import { RootState } from "../../store/rootStore";
import {
  addBookMarkedProducts,
  deleteBookMarkedProduct,
} from "../../store/bookMarkStore";
import { IItem } from "../Home/MainStyle";
import {
  ProductListMainWrapper,
  Section,
  IImageProps,
  BookMarkIcon,
  BookMarkStar,
  modalStyle,
  ModalImg,
} from "./ProductListStyle";
import ReactModal from "react-modal";
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
      if (targetItem) dispatch(addBookMarkedProducts(targetItem));
    } else dispatch(deleteBookMarkedProduct(bookMarkedTargetItem));
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
  const [targetUrl, setTargetUrl] = useState("");

  const handleModalOpenClose = (url?: string) => {
    setIsModalOpen((prev) => !prev);
    if (url) setTargetUrl(url);
  };
  console.log(targetUrl);

  return (
    <ProductListMainWrapper>
      <FilterBtn setFilteredItems={setItems} />
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => handleModalOpenClose()}
        style={modalStyle}
      >
        <ModalImg src={targetUrl} alt='Large Image' />
      </ReactModal>
      <Section>
        <ItemBox>
          {items?.map((item: IItem) => (
            <Item
              key={item.id}
              onClick={() =>
                handleModalOpenClose(item.image_url || item.brand_image_url)
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
      </Section>
    </ProductListMainWrapper>
  );
}
export default ProductList;
