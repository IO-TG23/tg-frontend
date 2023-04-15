import React, { useContext } from "react";
import { ListItemButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

function DrawerOption({ text, href, icon }) {
  const navigate = useNavigate();
  const {
    state: { setOpenDrawerMenu },
  } = useContext(AppContext);
  return (
    <ListItemButton
      onClick={() => {
        navigate({
          pathname: href,
        });
        setOpenDrawerMenu(false);
      }}
      sx={{
        padding: 2,
        margin: 1,
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
