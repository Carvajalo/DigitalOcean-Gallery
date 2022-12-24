import React, { useState } from "react";
import Image from "./Image";
import { Modal, Box } from "@mui/material";

function ImageItem({ image, setToggle, toggle }) {
  const handleShowImage = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <img
        onClick={handleShowImage}
        src={`${image.image_url}?w=248&fit=crop&auto=format`}
        alt={image.title}
        style={{ width: "100%", height: "200px" }}
        loading="lazy"
      />

      <Modal
        open={toggle}
        onClose={handleShowImage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ border: 0 }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1800,
            bgcolor: "background.paper",
            border: 0,
            borderColor: "primary.main",
          }}
        >
          <Image sx={{ border: 0 }} image={image} setToggle={setToggle}></Image>
        </Box>
      </Modal>
    </>
  );
}

export default ImageItem;
