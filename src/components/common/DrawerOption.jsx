import React from "react";
import { ListItemButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DrawerOption({ text, href, icon }) {
  const navigate = useNavigate();

  return (
    <ListItemButton
      onClick={() => {
        navigate({
          pathname: href,
        });
      }}
      sx={{
        padding:2,
        margin:1
      }}
    >
      <Typography>
        {icon}
        {text}
      </Typography>
    </ListItemButton>
  );
}

export default DrawerOption;
