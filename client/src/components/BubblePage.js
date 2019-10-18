import React, { useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = ({fetchColorsApi, colorList, setColorList}) => {
  // const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    fetchColorsApi();
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
