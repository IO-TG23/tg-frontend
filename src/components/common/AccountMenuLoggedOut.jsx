import React from "react";
import { MdLogin, MdAppRegistration } from "react-icons/md";
import MenuOption from "./MenuOption";

const menuItems = [
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

function AccountMenuLoggedOut() {
  return (
    <>
      {menuItems.map((i) => (
        <MenuOption key={i.text} {...i} />
      ))}
    </>
  );
}

export default AccountMenuLoggedOut;
