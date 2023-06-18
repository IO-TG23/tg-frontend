import { Paper } from "@mui/material";
import React from "react";

/**
 * @description Container for all pages
 * @param {*} param0 
 * @returns JSX.Element
 */
function MainContent({ children }) {
  return (
    <Paper
      sx={{
        minHeight: "90vh",
        padding: 2,
        marginTop: 2,
      }}
      elevation={3}
    >
      {children}
    </Paper>
  );
}

export default MainContent;
