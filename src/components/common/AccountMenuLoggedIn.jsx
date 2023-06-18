import React from "react";
import { MdElectricCar, MdCardMembership, MdLogout } from "react-icons/md";
import MenuOption from "./MenuOption";

const menuItems = [
  {
    icon: <MdElectricCar style={{ marginRight: 7 }} />,
    text: "Moje samochody",
    href: "/mycars",
  },
  {
    icon: <MdCardMembership style={{ marginRight: 7 }} />,
    text: "Moje konto",
    href: "/myaccount",
  },
  {
    icon: <MdLogout style={{ marginRight: 7 }} />,
    text: "Wyloguj",
    href: "/logout",
  },
];

function AccountMenuLoggedIn() {
  return (
    <>
      {menuItems.map((i) => (
        <MenuOption key={i.text} {...i} />
      ))}
    </>
  );
}

export default AccountMenuLoggedIn;
