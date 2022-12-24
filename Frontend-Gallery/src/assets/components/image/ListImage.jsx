import React from "react";
import {  useEffect } from "react";
import * as ImageServices from "./imageService";
import CardImage from "./CardImage";

import {
  ImageListItem,
  Container,
  ListSubheader,
  styled
} from "@mui/material";

import { useContext } from "react";
import ImageContext from "../../../context/ImageContext";

const ImageGalleryList = styled("ul")(({ theme }) => ({
  display: "grid",
  padding: 0,
  margin: theme.spacing(0, 4),
  gap: 8,
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
  },

  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
  },
}));

const ListImage = () => {
  const { update, images, setImages, setUpdate } = useContext(ImageContext);

  const loadElements = async () => {
    const { data } = await ImageServices.getImages();
    setImages(data);
  };

  useEffect(() => {
    loadElements();
    setUpdate(false);
  }, [update]);

  return (
    <div>
      <Container maxWidth={false}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Personal Gallery</ListSubheader>
        </ImageListItem>
        <ImageGalleryList
          cols={2}
          sx={{
            cols: 3,
            p: 1,
            variant: "outlined",
          }}
        >
          {images.map((item) => (
            <CardImage key={item._id} item={item}></CardImage>
          ))}
        </ImageGalleryList>
      </Container>
    </div>
  );
};

export default ListImage;
