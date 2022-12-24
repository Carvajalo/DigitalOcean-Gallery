import * as React from "react";
import * as imageService from "./imageService";
import { useContext, useState, useEffect } from "react";
import ImageContext from "../../../context/ImageContext";
import { Typography, Grid, TextField, Button, Box } from "@mui/material";

export default function ImageForm() {
  const {
    img,
    setImg,
    imageID,
    setImageID,
    images,
    setOpen,
    update,
    setUpdate,
    open,
  } = useContext(ImageContext);

  useEffect(() => {
    console.log(`ImageID: ${imageID}
    Open: ${open}
    Update: ${update}`);
    if (imageID) {
      const foundedImage = images.find((image) => image._id === imageID);
      setImg({
        title: foundedImage.title,
        file: foundedImage.file,
      });
    }
  }, []);

  const handdleChange = (e) => {
    if (e.target.name == "file") {
      return setImg({ ...img, [e.target.name]: e.target.files[0] });
    }
    setImg({ ...img, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("file", img.file);
    formData.append("title", img.title);
    if (!imageID) {
      await imageService.uploadImage(formData);
    } else {
      await imageService.updateImage(imageID, formData);
      setImageID(null);
    }
    setOpen(false);
    setUpdate(true);
  };
  return (
    <Box
      component="form"
      sx={{
        m: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h6" gutterBottom>
        Upload Image
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <TextField
            color="secondary"
            name="file"
            required
            type="file"
            onChange={handdleChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <TextField
            id="cvv"
            label="TITLE"
            helperText="Title"
            fullWidth
            name="title"
            autoComplete="cc-csc"
            variant="standard"
            value={img.title}
            onChange={handdleChange}
          />
        </Grid>

        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Box>
  );
}
