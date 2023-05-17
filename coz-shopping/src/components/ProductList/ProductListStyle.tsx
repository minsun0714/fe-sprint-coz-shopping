import styled from "styled-components";
import { RootState } from "../../store/rootStore";
import { useSelector } from "react-redux";
import { IItem } from "../Home/Main";

export const ProductListMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 84vh;
`;

export const Section = styled.section`
  margin: 0 20px 0px;
  padding-bottom: 100px;
`;

export interface IImageProps {
  id: any;
}

export const enum BookMarkIcon {
  onIcon = "/image/bookmark_on.jpg",
  offIcon = "/image/bookmark_off.jpg",
}

export const BookMarkStar = styled.div<IImageProps>`
  background-image: ${(props: IImageProps): string => {
    const bookMarkedProducts = useSelector(
      (store: RootState) => store.bookMarkedProducts
    );
    const isBookMarked = bookMarkedProducts.find(
      (product: IItem) => product.id === props.id
    );
    const imageUrl = isBookMarked ? BookMarkIcon.onIcon : BookMarkIcon.offIcon;
    return `url(${imageUrl})`;
  }};
  border: none;
  height: 24px;
  width: 25px;
  margin-top: -90px;
  margin-left: 260px;
  z-index: 0.5;
  cursor: pointer;
`;
