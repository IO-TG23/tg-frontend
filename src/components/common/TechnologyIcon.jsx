import React from "react";
import { Paper, IconButton } from "@mui/material";

/**
 * @description Icon for displaying technologies used in the project
 * @param {*} params 
 * @returns JSX.Element
 */
function TechnologyIcon({ icon, href }) {
  const handleClick = () => {
    window.location.href = href;
  };

  return (
    <Paper
      sx={{
        display: "inline-block",
        width: "fit-content",
        height: "fit-content",
        p: 1,
        m: 1,
      }}
    >
      <IconButton onClick={handleClick}>{icon}</IconButton>
    </Paper>
  );
}

export default TechnologyIcon;
