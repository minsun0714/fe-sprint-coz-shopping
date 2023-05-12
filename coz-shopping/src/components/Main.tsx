import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const MainWrapper = styled.header`
  border: 1px solid transparent;
  margin: none;
  height: 820px;
  box-shadow: 0px 5px 5px gray;
  display: flex;
  flex-direction: row;
`;

function Main() {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    axios
      .get("http://cozshopping.codestates-seb.link/api/v1/products", {
        params: {
          count: 4,
        },
      })
      .then((response) => {
        console.log(response.data);
        setItemsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <MainWrapper></MainWrapper>;
}
export default Main;
