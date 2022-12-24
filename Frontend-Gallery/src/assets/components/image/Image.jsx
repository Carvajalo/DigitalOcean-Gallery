import React from "react";
import {ImageListItemBar, IconButton} from "@mui/material";

function Image({ image: { image_url, title } }) {
  return (
    <div>
      {title && (
        <ImageListItemBar
          sx={{ border: 0 }}
          title={title}
          actionIcon={
            <IconButton
              sx={{ border: 0 }}
              aria-label={`info about ${title}`}
            ></IconButton>
          }
        />
      )}
      <img src={image_url} alt={title} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}

export default Image;
