import { useState, useEffect } from "react";
import axios from "axios";
import { IItem } from "../Pages/Home/MainType";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/productsStore";
import { RootState } from "../store/rootStore";
import { initialUrl } from "./initialUrl";
import queryParameter from "./queryParameter";

const useFetch = (count?: number) => {
  const currentProductsState = useSelector(
    (store: RootState) => store.products
  );
  const [url, setUrl] = useState(initialUrl);
  const [value, setValue] = useState<IItem[]>([]);
  const dispatch = useDispatch();

  const fetchData = () =>
    axios
      .get(count ? url + queryParameter(count) : url)
      .then((response) => {
        setValue(response.data);
        dispatch(getAllProducts(response.data));
      })
      .catch((error) => console.log(error));

  useEffect(() => {
    if (currentProductsState.length === 0) fetchData();
  }, []);

  return value.length ? value : currentProductsState;
};
export default useFetch;
