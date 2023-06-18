import React from "react";
import { Modal, Box, Grid, Paper, Typography } from "@mui/material";

/**
 * @description Modal with app styles applied
 * @param {*} props 
 * @returns JSX.Element
 */
function AppModal({
  openModal,
  handleModalClose,
  title,
  contentMain,
  contentOptional,
}) {
  return (
    <Modal
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container justifyContent={"center"}>
        <Grid item>
          <Box sx={{ m: 2, p: 5 }}>
            <Paper sx={{ m: 2, p: 4 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {title}
              </Typography>
              <Grid container alignItems={"center"} flexDirection={"column"}>
                <Grid item>{contentMain}</Grid>
                <Grid item sx={{ p: 2 }}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {contentOptional}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default AppModal;
