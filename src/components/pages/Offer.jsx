import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainContent from "../common/MainContent";
import { MdDelete, MdEdit, MdImportExport } from "react-icons/md";
import { AccountContext } from "../../App";

import {
  Breadcrumbs,
  Grid,
  Link,
  Typography,
  TableContainer,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import axios from "axios";
import ProtectedComponent from "../common/ProtectedComponent";

function Offer() {
  const [offer, setOffer] = React.useState({ vehicle: {} });
  const [firstColumn, setFirstColumn] = React.useState([]);
  const [secondColumn, setSecondColumn] = React.useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const [breadCrumbs, setBreadCrumbs] = useState([
    <Link href="/">Dom</Link>,
    <Link href="/offerlist">Oferty</Link>,
  ]);

  const exportOffer = async () => {
    const email = localStorage.getItem("email");

    try {
      await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/Offer/export/${params.id}`,
        { email }
      );

      alert("Eksport zakończony powodzeniem");
    } catch (e) {
      alert(
        "Eksport nieudany, spróbuj ponownie bądź skontaktuj się z administratorem"
      );
    }
  };

  useEffect(() => {
    setBreadCrumbs((prev) => [
      ...prev,
      <Typography key="3">{params.id}</Typography>,
    ]);
    GetData();
  }, []);

  const GetData = async () => {
    try {
      const request = await axios.get(
        `${import.meta.env.REACT_APP_BACKEND_URL}/Offer/${params.id}`,
        {}
      );

      var car = request.data;
      if (car) {
        setOffer(car);
        let firstColumn = [
          { name: "Ilość drzwi", value: car.numberOfDoors },
          { name: "Ilość siedzeń", value: car.numberOfSeats },
          { name: "Pojemność bagażnika", value: car.bootCapacity },
          { name: "Długość", value: car.length },
          { name: "Wysokość", value: car.height },
          { name: "Szerokość", value: car.width },
        ];
        setFirstColumn(firstColumn);

        let secondColumn = [
          {
            name: "Rok rozpoczęcia produkcji",
            value: car.productionStartYear,
          },
          {
            name: "Rok zakończenia produkcji",
            value: car.productionEndYear,
          },
          { name: "Rozstaw osi", value: car.wheelBase },
          { name: "Rozstaw kół - tył", value: car.backWheelTrack },
          { name: "Rozstaw kół - przód", value: car.frontWheelTrack },
        ];
        setSecondColumn(secondColumn);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editOffer = () => {
    navigate(`/offerform?id=${params.id}`);
  };

  const deleteOffer = async () => {
    try {
      await axios.delete(
        `${import.meta.env.REACT_APP_BACKEND_URL}/Offer/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate({
        pathname: "/offerlist",
      });
    } catch (e) {
      alert("Usunięcie oferty niemożliwe");
    }
  };

  return (
    <MainContent>
      <Grid
        container
        style={{
          width: "1200px",
          margin: "0 auto",
          padding: "30px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
        direction="column"
      >
        <Grid container direction="row">
          <img
            src={
              offer?.blobIds
                ? `${import.meta.env.REACT_APP_BACKEND_URL}/Blob/${
                    offer?.blobIds[0]
                  }`
                : ""
            }
            alt={offer.vehicleName}
            width="70%"
            loading="lazy"
          />
          <Typography
            style={{
              marginLeft: "20px",
              width: "25%",
              fontSize: "medium",
              fontWeight: "bold",
            }}
          >
            Nazwa: {offer.vehicleName}
            <br />
            Cena: {offer.price}
            <br />
            Skrzynia biegów: {offer.gearbox}
            <br />
            Email: {offer.contactEmail}
            <br />
            Numer telefonu: {offer.contactPhoneNumber}
            <br />
            <br />
            {offer.vehicleDescription}
          </Typography>
        </Grid>
        <Grid container direction="row" style={{ margin: "0 auto" }}>
          <TableContainer sx={{ "tr td": { border: 0 }, width: "300px" }}>
            {firstColumn.map((item) => (
              <TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.value}</TableCell>
              </TableRow>
            ))}
          </TableContainer>
          <TableContainer sx={{ "tr td": { border: 0 }, width: "300px" }}>
            {secondColumn.map((item) => (
              <TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.value}</TableCell>
              </TableRow>
            ))}
          </TableContainer>
          <Grid
            style={{
              width: "500px",
              marginTop: "20px",
              fontSize: "large",
              lineHeight: "25px",
              marginLeft: "20px",
            }}
          >
            {offer.vehicleDescription}
          </Grid>
          <ProtectedComponent
            component={
              <Grid container flexDirection={"column"}>
                <Grid item>
                  <Typography variant="h6">Akcje</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.1)",
                      margin: "5px",
                    }}
                    onClick={exportOffer}
                  >
                    <MdImportExport />
                  </IconButton>
                  <IconButton
                    color="info"
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.1)",
                      margin: "5px",
                    }}
                    onClick={editOffer}
                  >
                    <MdEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.1)",
                      margin: "5px",
                    }}
                    onClick={deleteOffer}
                  >
                    <MdDelete />
                  </IconButton>
                </Grid>
              </Grid>
            }
          />
        </Grid>
      </Grid>
    </MainContent>
  );
}

export default Offer;
