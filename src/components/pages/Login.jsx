import React, { useEffect, useState, useContext } from "react";
import MainContent from "../common/MainContent";
import {
  Grid,
  TextField,
  Typography,
  Link as MuiLink,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../App";
import { MdOutlineLogin } from "react-icons/md";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notFilled, setNotFilled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMsg, setAlertMsg] = useState("Użytkownik zalogowany");

  const navigate = useNavigate();
  const { setManageAccountState } = useContext(AccountContext);

  useEffect(() => {
    if (email && password && email.length > 0 && password.length > 0) {
      setNotFilled(false);
    } else {
      setNotFilled(true);
    }
  }, [email, password]);

  const handleClick = async () => {
    try {
      const request = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", request.data.message);
      setManageAccountState({
        loggedIn: true,
      });
      setShowAlert(true);

      setTimeout(() => {
        navigate({
          pathname: "/",
        });
      }, 1000);
      
    } catch (err) {
      localStorage.removeItem("token");
      setManageAccountState({
        loggedIn: false,
      });
      setAlertVariant("error");
      setAlertMsg(JSON.stringify(err.response.data.messages));
      setShowAlert(true);
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
            Zaloguj się
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
          <MuiLink
            typography={"subtitle2"}
            onClick={() => {
              navigate({
                pathname: "/register",
              });
            }}
          >
            Nie posiadasz konta? Zarejestruj się
          </MuiLink>
          <br />
          <MuiLink
            typography={"subtitle2"}
            onClick={() => {
              navigate({
                pathname: "/resetpassword",
              });
            }}
          >
            Nie pamiętam hasła
          </MuiLink>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MdOutlineLogin />}
            disabled={notFilled}
            onClick={handleClick}
          >
            Zaloguj się
          </Button>
        </Grid>
      </Grid>
    </MainContent>
  );
}

export default Login;
