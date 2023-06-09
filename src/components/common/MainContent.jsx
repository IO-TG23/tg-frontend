import { Paper } from "@mui/material";
import React from "react";

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
