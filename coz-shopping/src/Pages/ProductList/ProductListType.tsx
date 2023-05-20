import { IItem } from "../Home/MainType";

export const enum ItemType {
  Whole = "Whole",
  Product = "Product",
  Category = "Category",
  Exhibition = "Exhibition",
  Brand = "Brand",
}

export interface IImageProps {
  id: any;
}

export const enum BookMarkIcon {
  onIcon = "/image/bookmark_on.jpg",
  offIcon = "/image/bookmark_off.jpg",
}

export interface IModalDetail {
  id?: number;
  title?: string | null;
  url?: string;
}

export const enum FilterBtnIcon {
  Whole = "/image/버튼 전체.png",
  Product = "/image/버튼 상품.png",
  Category = "/image/버튼 카테고리.png",
  Exhibition = "/image/버튼 기획전.png",
  Brand = "/image/버튼 브랜드.png",
}

export interface IStyledFilteredBtn {
  name?: string;
}

export interface IFilteredBtn {
  setFilteredItems: (items: IItem[]) => void;
  products: IItem[];
}
