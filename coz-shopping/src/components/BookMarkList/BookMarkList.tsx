import React, { useEffect, useState } from "react";
import {
  Item,
  ItemImg,
  ItemBox,
  ItemInfo,
  LeftInfo,
  RightInfo,
  LeftUp,
  RightUp,
} from "../Home/Main";
import FilterBookMarkBtn from "../BookMarkList/FilterBookMarkBtn";
import {
  ProductListMainWrapper,
  BookMarkStar,
  Section,
} from "../ProductList/ProductList";
import { IItem } from "../Home/Main";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import {
  addBookMarkedProducts,
  deleteBookMarkedProduct,
} from "../../store/bookMarkStore";

export const enum ItemType {
  Product = "Product",
  Category = "Category",
  Exhibition = "Exhibition",
  Brand = "Brand",
}

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

  return (
    <ProductListMainWrapper>
      <FilterBookMarkBtn
        setFilteredItems={setItems}
        bookMarkedProducts={bookMarkedProducts}
      />
      <Section>
        <ItemBox>
          {items?.map((item: IItem) => (
            <Item key={item.id}>
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
