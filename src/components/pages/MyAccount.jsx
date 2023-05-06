import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Grid, Typography } from "@mui/material";
import { MdDeleteForever, MdLockReset, MdChangeCircle } from "react-icons/md";
import axios from "axios";

import MainContent from "../common/MainContent";

function MyAccount() {
  const [deleteDisabled, setDeleteDisabled] = useState(true);

  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    try {
      await axios.delete(
        `${import.meta.env.REACT_APP_BACKEND_URL}/Auth/deleteOwn`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.removeItem("token");

      navigate("/");
    } catch (err) {
      alert("Wystąpił błąd! Spróbuj ponownie później");
    }
  };

  const handleResetPasswordClick = () => {
    navigate("/resetpassword");
  };

  const handleChangePasswordClick = () => {
    navigate("/changepassword");
  };

  return (
    <MainContent>
      <Typography variant="h5" m={1}>
        Zarządzaj swoim kontem
      </Typography>
      <Grid container>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<MdLockReset />}
          onClick={handleResetPasswordClick}
          sx={{ margin: 1 }}
        >
          Przywróć hasło
        </Button>

        <Button
          variant="contained"
          color="info"
          startIcon={<MdChangeCircle />}
          onClick={handleChangePasswordClick}
          sx={{ margin: 1 }}
        >
          Zmień hasło
        </Button>
      </Grid>
      <Grid container flexDirection={"column"}>
        <Grid item>
          <Typography variant="h6" color={"error"}>
            Strefa niebezpieczna:
          </Typography>
        </Grid>
        <Grid item>
          <Checkbox
            onChange={(e) => {
              setDeleteDisabled(!e.target.checked);
            }}
          />
          <Button
            variant="contained"
            color="error"
            startIcon={<MdDeleteForever />}
            disabled={deleteDisabled}
            onClick={handleDeleteClick}
          >
            Usuń konto
          </Button>
        </Grid>
      </Grid>
    </MainContent>
  );
}

export default MyAccount;
