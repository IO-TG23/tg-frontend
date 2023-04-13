import React from "react";
import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MenuOption({ text, href, icon }) {
  const navigate = useNavigate();

  return (
    <MenuItem
      onClick={() => {
        navigate({
          pathname: href,
        });
      }}
    >
      <Typography>
        {icon}
        {text}
      </Typography>
    </MenuItem>
  );
}

export default MenuOption;
