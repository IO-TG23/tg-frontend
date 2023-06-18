import React, { useEffect, useState } from "react";
import MainContent from "../common/MainContent";
import { Grid, TextField, Typography, Alert, Button } from "@mui/material";
import axios from "axios";
import { MdPassword } from "react-icons/md";

/**
 * @description Component for changing users' password
 * @returns JSX.Element
 */
function ChangePassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [notFilled, setNotFilled] = useState(true);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMsg, setAlertMsg] = useState("Hasło zmienione poprawnie.");

  useEffect(() => {
    if (
      email &&
      email.length > 0 &&
      newPassword &&
      newPassword.length > 0 &&
      token &&
      token.length > 0
    ) {
      setNotFilled(false);
    } else {
      setNotFilled(true);
    }
  }, [email, newPassword, token]);

  const handleClick = async () => {
    try {
      const request = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/auth/changePassword`,
        {
          email,
          newPassword,
          token,
        }
      );

      if (request.status === 204 || request.status === 200) {
        setShowAlert(true);
      }
    } catch (err) {
      setShowAlert(true);
      setAlertVariant("error");
      setAlertMsg("Reset hasła niemożliwym");
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
            Zmień hasło
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
        <Grid item xs={12} md={6}>
          <TextField
            label="Nowe hasło"
            type="password"
            color="primary"
            placeholder="Nowe hasło"
            fullWidth={true}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Token"
            type="text"
            color="primary"
            placeholder="Token podany w mailu"
            fullWidth={true}
            onChange={(e) => {
              setToken(e.target.value);
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
            Zmień hasło
          </Button>
        </Grid>
      </Grid>
    </MainContent>
  );
}

export default ChangePassword;
