import React from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { MdAdd, MdShare } from "react-icons/md";
import { SiGithub } from "react-icons/si";

const actions = [
  {
    name: "Udostępnij",
    icon: <MdShare />,
    tooltipTitle: "Udostępnij",
    click: () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
    },
  },
  {
    name: "Github",
    icon: <SiGithub />,
    tooltipTitle: "Github",
    click: () => {
      window.location.href = "https://github.com/IO-TG23";
    },
  },
];

function AppDial() {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<MdAdd />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.click}
        />
      ))}
    </SpeedDial>
  );
}

export default AppDial;
