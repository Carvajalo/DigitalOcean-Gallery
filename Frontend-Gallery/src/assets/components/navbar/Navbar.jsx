import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ImageForm from "../image/ImageForm";
import ImageContext from "../../../context/ImageContext";

const navbar = () => {
  const { open, setOpen, setImageID } = useContext(ImageContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setImageID(null);
    setOpen(false);
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
            <Button onClick={handleOpen} color="inherit">
              New Photo
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "25vw",
                  height: "60vh",
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <ImageForm setOpen={setOpen}></ImageForm>
              </Box>
            </Modal>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default navbar;
