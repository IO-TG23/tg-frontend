import React, { useEffect, useState } from "react";
import MainContent from "../common/MainContent";
import {
  Grid,
  TextField,
  Typography,
  Link as MuiLink,
  Button,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdOutlineAppRegistration } from "react-icons/md";
import axios from "axios";

import AppModal from "../common/AppModal";

/**
 * @description Component with logic for registration
 * @returns JSX.Element
 */
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notFilled, setNotFilled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMsg, setAlertMsg] = useState("Użytkownik zarejestrowany");
  const [openModal, setOpenModal] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (
      email &&
      password &&
      confirmPassword &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      setNotFilled(false);
    } else {
      setNotFilled(true);
    }
  }, [email, password, confirmPassword]);

  const handleClick = async () => {
    try {
      const request = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/auth/Register`,
        {
          email,
          password,
          confirmPassword,
        }
      );

      if (request.status === 200) {
        setShowAlert(true);
        setOpenModal(true);
        setQrCode(request.data.message);
      }
    } catch (err) {
      setAlertVariant("error");
      setAlertMsg(JSON.stringify(err.response.data.errorMessage));
      setShowAlert(true);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);

    setTimeout(() => {
      navigate({
        pathname: "/login",
      });
    }, 1000);
  };

  return (
    <MainContent>
      <AppModal contentMain={<img src={qrCode} />} contentOptional={"Nie zapomnij odwiedzić swojego maila w celu potwierdzenia konta"} handleModalClose={handleModalClose} openModal={openModal} title={"Zarejestruj się"} />
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
            Zarejestruj się
          </Typography>
        </Grid>
        <Grid item xs={12}>
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
          <TextField
            label="Hasło"
            type="password"
            color="primary"
            placeholder="Twoje hasło"
            fullWidth={true}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Potwierdź hasło"
            type="password"
            color="primary"
            placeholder="Potwierdzone hasło"
            fullWidth={true}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiLink
            typography={"subtitle2"}
            onClick={() => {
              navigate({
                pathname: "/login",
              });
            }}
          >
            Posiadasz konto? Zaloguj się
          </MuiLink>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MdOutlineAppRegistration />}
            disabled={notFilled}
            onClick={handleClick}
          >
            Zarejestruj się
          </Button>
        </Grid>
      </Grid>
    </MainContent>
  );
}

export default Register;
