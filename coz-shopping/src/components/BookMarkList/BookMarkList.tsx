import { useState } from "react";
import { Item, ItemImg, ItemBox } from "../Home/Main";
import FilterBookMarkBtn from "../BookMarkList/FilterBookMarkBtn";
import ProductList, {
  ProductListMainWrapper,
  BookMarkStar,
  Section,
} from "../ProductList/ProductList";
import { IItem } from "../Home/Main";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import {
  getBookMarkedProducts,
  deleteBookMarkedProduct,
} from "../../store/bookMarkStore";

function BookMarkList() {
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
      if (targetItem) dispatch(getBookMarkedProducts(targetItem));
    } else dispatch(deleteBookMarkedProduct(bookMarkedTargetItem));
  };

  return (
    <ProductListMainWrapper>
      <FilterBookMarkBtn setFilteredItems={setItems} />
      <Section>
        <ItemBox>
          {items?.map((item: IItem) => (
            <Item key={item.id}>
              <ItemImg src={item.image_url || item.brand_image_url}></ItemImg>
              <BookMarkStar
                id={item.id}
                onClick={() => onClickBookMark(item.id)}
              ></BookMarkStar>
              <li>{item.title || item.brand_name}</li>
            </Item>
          ))}
        </ItemBox>
      </Section>
    </ProductListMainWrapper>
  );
}
export default BookMarkList;
