import React, { useContext } from "react";
import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

function MenuOption({ text, href, icon }) {
  const navigate = useNavigate();
  const {
    state: { setOpenAccountMenu },
  } = useContext(AppContext);
  return (
    <MenuItem
      onClick={() => {
        navigate({
          pathname: href,
        });
        setOpenAccountMenu(false);
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
