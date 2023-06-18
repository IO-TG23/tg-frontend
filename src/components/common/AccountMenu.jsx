import React, { useContext } from "react";
import { Menu, Typography } from "@mui/material";
import { AccountContext } from "../../App";
import AccountMenuLoggedIn from "./AccountMenuLoggedIn";
import AccountMenuLoggedOut from "./AccountMenuLoggedOut";

/**
 * @description General account menu component
 * @param {*} props 
 * @returns JSX.Element
 */
function AccountMenu({ accountMenuRef, open, setOpen }) {
  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const { state : {loggedIn} } = useContext(AccountContext);

  return (
    <Menu
      id="account-menu"
      anchorEl={accountMenuRef}
      open={open}
      onClose={handleClose}
    >
      {loggedIn ? <AccountMenuLoggedIn /> : <AccountMenuLoggedOut />}
    </Menu>
  );
}

export default AccountMenu;
