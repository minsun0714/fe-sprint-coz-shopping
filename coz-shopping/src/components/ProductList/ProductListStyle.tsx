import styled from "styled-components";
import { RootState } from "../../store/rootStore";
import { useSelector } from "react-redux";
import { IItem } from "../Home/MainStyle";

export const modalStyle: ReactModal.Styles = {
  content: {
    top: "40vh",
    left: "47vw",
    bottom: "auto",
    transform: "translate(-45%, -25%)",
    width: "744px",
    height: "481px",
    position: "sticky",
    padding: "0",
    paddingRight: "0px",
    borderRadius: "20px",
    zIndex: "9999",
  },
};

export const ModalDetail = styled.div`
  position: relative;
`;

export const ModalImg = styled.img`
  position: absolute;
  width: 742px;
  height: 478px;
  padding-bottom: 0;
  z-index: 0;
`;

export const ModalTitle = styled.h3`
  position: absolute;
  margin-top: 435px;
  margin-left: 58px;
  z-index: 999999;
  width: 200px;
  height: 20px;
  color: white;
  font-weight: 600;
`;

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

export const BookMarkStarModal = styled(BookMarkStar)`
  position: absolute;
  height: 24px;
  width: 25px;
  margin: 430px 240px 0 20px;
  z-index: 1;
  cursor: pointer;
`;

export interface IModalDetail {
  id?: number;
  title?: string | null;
  url?: string;
}

interface XSign {
  src: string;
}

export const XSign = styled.img<XSign>`
  position: absolute;
  height: 30px;
  width: 30px;
  margin: 20px 0 0 690px;
  z-index: 10;
  cursor: pointer;
`;

export const enum ItemType {
  Product = "Product",
  Category = "Category",
  Exhibition = "Exhibition",
  Brand = "Brand",
}
