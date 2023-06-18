import React, { useContext } from "react";
import { Divider, Drawer, List } from "@mui/material";

import {
  MdCardMembership,
  MdLogin,
  MdAppRegistration,
  MdPerson,
  MdHome,
  MdDirectionsCar,
  MdPrivacyTip,
} from "react-icons/md";

import { AccountContext } from "../../App";
import DrawerOption from "./DrawerOption";

const menuItemsLoggedOut = [
  {
    icon: <MdLogin style={{ marginRight: 7 }} />,
    text: "Zaloguj się",
    href: "/login",
  },
  {
    icon: <MdAppRegistration style={{ marginRight: 7 }} />,
    text: "Zarejestruj",
    href: "/register",
  },
];

const menuItemsLoggedIn = [
  {
    icon: <MdCardMembership style={{ marginRight: 7 }} />,
    text: "Moje konto",
    href: "/myaccount",
  },
];

const menuItemsOther = [
  {
    icon: <MdHome style={{ marginRight: 7 }} />,
    text: "Strona domowa",
    href: "/",
  },
  {
    icon: <MdDirectionsCar style={{ marginRight: 7 }} />,
    text: "Oferty",
    href: "/offerlist",
  },
  {
    icon: <MdPerson style={{ marginRight: 7 }} />,
    text: "O nas",
    href: "/about",
  },
  {
    icon: <MdPrivacyTip style={{ marginRight: 7 }} />,
    text: "Prywatność",
    href: "/privacy",
  },
];

function DrawerMenu({ open, setOpen }) {
  const {
    state: { loggedIn },
  } = useContext(AccountContext);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Drawer anchor={"left"} open={open} onClose={handleClose}>
      <List>
        {loggedIn ? (
          <>
            {menuItemsLoggedIn.map((i) => (
              <DrawerOption key={i.text} {...i} />
            ))}
            <Divider />
          </>
        ) : (
            <>
              {menuItemsLoggedOut.map((i) => (
                <DrawerOption key={i.text} {...i} />
              ))}
              <Divider />
            </>
          )}
        {menuItemsOther.map((i) => (
          <DrawerOption key={i.text} {...i} />
        ))}
      </List>
    </Drawer>
  );
}

export default DrawerMenu;
