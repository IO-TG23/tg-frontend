import React, { useEffect, useState } from "react";
import MainContent from "../common/MainContent";
import { Grid, TextField, Typography, Alert, Button } from "@mui/material";
import axios from "axios";
import { MdPassword } from "react-icons/md";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [notFilled, setNotFilled] = useState(true);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMsg, setAlertMsg] = useState(
    "Odwiedź swój adres mailowy po dalsze instrukcje."
  );

  useEffect(() => {
    if (email && email.length > 0) {
      setNotFilled(false);
    } else {
      setNotFilled(true);
    }
  }, [email]);

  const handleClick = async () => {
    try {
      const request = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/auth/resetPassword`,
        {
          email,
        }
      );

      if (request.status === 204 || request.status === 200) {
        setShowAlert(true);
      }
    } catch (err) {
      setShowAlert(true);
      setAlertVariant("error");
      setAlertMsg("Przywrócenie hasła niemożliwym");
    }
  };

  return (
    <MainContent>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Alert
            variant="standard"
            severity={alertVariant}
            sx={{
              visibility: showAlert ? "show" : "hidden",
            }}
            onClose={() => {
              setShowAlert(false);
            }}
          >
            {alertMsg}
          </Alert>
          <Typography variant="h5" component="div">
            Przywróć hasło
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            type="email"
            color="primary"
            placeholder="Twój email"
            fullWidth={true}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MdPassword />}
            disabled={notFilled}
            onClick={handleClick}
          >
            Resetuj hasło
          </Button>
        </Grid>
      </Grid>
    </MainContent>
  );
}

export default ResetPassword;
