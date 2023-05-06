import React, { useState, useRef, useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import { MdAccountCircle, MdNotifications } from "react-icons/md";
import AccountMenu from "./common/AccountMenu";
import logo from "../assets/logo.jpg";
import DrawerMenu from "./common/DrawerMenu";
import { AppContext } from "../App";

function Header() {
  const {
    state: { openAccountMenu, setOpenAccountMenu },
  } = useContext(AppContext);
  const {
    state: { openDrawerMenu, setOpenDrawerMenu, showNewOfferInfo },
  } = useContext(AppContext);

  const accountMenuRef = useRef();

  const handleAccountMenu = () => {
    setOpenAccountMenu((prev) => !prev);
  };

  const handleDrawerMenu = () => {
    setOpenDrawerMenu((prev) => !prev);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleDrawerMenu}
        >
          <img src={logo} className="logo" />
        </IconButton>
        <DrawerMenu open={openDrawerMenu} setOpen={setOpenDrawerMenu} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tanie graty
        </Typography>
        <Badge
          badgeContent={showNewOfferInfo ? <MdNotifications /> : 0}
          color="success"
        >
          <IconButton
            color="inherit"
            ref={accountMenuRef}
            onClick={handleAccountMenu}
          >
            <MdAccountCircle />
          </IconButton>
        </Badge>

        <AccountMenu
          accountMenuRef={accountMenuRef.current}
          open={openAccountMenu}
          setOpen={setOpenAccountMenu}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
