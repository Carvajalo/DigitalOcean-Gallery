import React, { useState } from "react";
import {Box, Toolbar, Typography, IconButton, Popover} from "@mui/material/Box";

import MenuIcon from "@mui/icons-material/Menu";

export default function Menu() {
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = () => {
    setAnchorEl(!anchorEl);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <IconButton
          aria-describedby={id}
          onClick={handleClick}
          variant="contained"
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClick}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            options={{
              position: "absolute",
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </Box>
  );
}
