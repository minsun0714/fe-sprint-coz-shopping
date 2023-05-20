import React from "react";
import {
  ItemInfo,
  LeftInfo,
  RightInfo,
  LeftUp,
  RightUp,
} from "../../Home/MainStyle";
import { ItemType } from "../ProductListType";
import { IItem } from "../../Home/MainType";

function ItemDetail({ item }: { item: IItem }) {
  return (
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
  );
}
export default ItemDetail;
