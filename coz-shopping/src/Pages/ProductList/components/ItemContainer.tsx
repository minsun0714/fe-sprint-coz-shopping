import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemBox, Item, ItemImg } from "../../Home/MainStyle";
import { RootState } from "../../../store/rootStore";
import { addBookMark, deleteBookMark } from "../../../store/bookMarkStore";
import { IItem } from "../../Home/MainType";
import { BookMarkStar } from "../ProductListStyle";
import { IModalDetail } from "../ProductListType";
import ItemDetail from "./ItemInfo";

function ItemContainer({ items }: any) {
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
          <BookMarkStar id={item.id} onClick={() => onClickBookMark(item.id)} />
          <ItemDetail item={item} />
        </Item>
      ))}
    </ItemBox>
  );
}
export default ItemContainer;
