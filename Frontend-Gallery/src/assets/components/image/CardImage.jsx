import React, { useContext, useState } from "react";
import ImageItem from "./ImageItem";
import * as imageService from "./imageService";
import ImageContext from "../../../context/ImageContext";
import {
  ImageListItem,
  ImageListItemBar,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function CardImage({ item }) {
  const [toggle, setToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const { setOpen, setImageID, setUpdate } = useContext(ImageContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleShow = () => {
    setToggle(!toggle);
    handleClose();
  };

  const handleDelete = async () => {
    await imageService.deleteImage(item._id);
    setUpdate(true);
    handleClose();
  };

  const handleUpdate = async () => {
    setImageID(item._id);
    setOpen(true);
    handleClose();
  };
  return (
    <>
      <ImageListItem>
        <ImageItem image={item} setToggle={setToggle} toggle={toggle} />
        {item.title && (
          <ImageListItemBar
            title={item.title}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.title}`}
              ></IconButton>
            }
          />
        )}

        <ImageListItemBar
          position="top"
          sx={{
            background: "none",
          }}
          actionIcon={
            <>
              <IconButton
                sx={{ p: 2 }}
                id="basic-button"
                aria-controls={anchorEl ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleUpdate}>Update</MenuItem>
                <MenuItem onClick={handleShow}>View</MenuItem>
              </Menu>
            </>
          }
        />
      </ImageListItem>
    </>
  );
}

export default CardImage;
