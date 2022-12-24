import React, { createContext, useState } from "react";

export const ImageContext = createContext();

export function ImageContextProvider(props) {
  const [update, setUpdate] = useState(false);
  const [images, setImages] = useState([]);
  // Schema image:
  const [img, setImg] = useState({
    file: null,
    title: "",
  });


  // Preview image toggle:
  const [open, setOpen] = useState(false);
  const [imageID, setImageID] = useState(null);

  return (
    <ImageContext.Provider
      value={{
        images,
        setImages,
        update,
        setUpdate,
        img,
        setImg,
        imageID,
        setImageID,
        open,
        setOpen,
        setOpen,
      }}
    >
      {props.children}
    </ImageContext.Provider>
  );
}

export default ImageContext;
