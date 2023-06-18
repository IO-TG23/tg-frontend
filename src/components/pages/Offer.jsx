import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainContent from "../common/MainContent";
import {
  Breadcrumbs,
  Grid,
  Link,
  Typography,
  TableContainer,
  TableRow,
  TableCell
} from "@mui/material";
import axios from "axios";

function Offer() {
  const [offer, setOffer] = React.useState({ vehicle: {} });
  const [firstColumn, setFirstColumn] = React.useState([]);
  const [secondColumn, setSecondColumn] = React.useState([]);
  const params = useParams();

  const [breadCrumbs, setBreadCrumbs] = useState([
    <Link href="/">Dom</Link>,
    <Link href="/offerlist">Oferty</Link>,
  ]);
  useEffect(() => {
    setBreadCrumbs((prev) => [
      ...prev,
      <Typography key="3">{params.id}</Typography>,
    ]);
    GetData()
  }, []);

  const GetData = async () => {
    try {
      const request = await axios.get(
        `${import.meta.env.REACT_APP_BACKEND_URL}/Offer/${id}`, {});

      var car = request.data.message
      if (car) {
        setOffer(car)
        let firstColumn = [
          { name: "Ilość drzwi", value: car.vehicle.numberOfDoors },
          { name: "Ilość siedzeń", value: car.vehicle.numberOfSeats },
          { name: "Pojemność bagażnika", value: car.vehicle.bootCapacity },
          { name: "Długość", value: car.vehicle.length },
          { name: "Wysokość", value: car.vehicle.height },
          { name: "Szerokość", value: car.vehicle.width }
        ]
        setFirstColumn(firstColumn)

        let secondColumn = [
          { name: "Rok rozpoczęcia produkcji", value: car.vehicle.productionStartYear },
          { name: "Rok zakończenia produkcji", value: car.vehicle.productionEndYear },
          { name: "Rozstaw osi", value: car.vehicle.wheelBase },
          { name: "Rozstaw kół - tył", value: car.vehicle.backWheelTrack },
          { name: "Rozstaw kół - przód", value: car.vehicle.frontWheelTrack }
        ]
        setSecondColumn(secondColumn)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <MainContent>
      <Grid container style={{ width: "1200px", margin: "0 auto", padding: "30px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} direction="column" >
        <Grid container direction="row" >
          <img
            src={offer.image}
            alt={offer.vehicle.name}
            width="70%"
            loading="lazy"
          />
          <Typography style={{ marginLeft: "20px", width: "25%", fontSize: "medium", fontWeight: "bold" }}>
            Nazwa: {offer.vehicle.name}<br />
            Cena: {offer.price}<br />
            Skrzynia biegów: {offer.vehicle.gearbox}<br />
            Napęd: {offer.vehicle.drive}<br />
            Email: {offer.contactEmail}<br />
            Numer telefonu: {offer.contactPhoneNumber}<br /><br />
            {offer.vehicle.description}
          </Typography>
        </Grid>
        <Grid container direction="row" style={{ margin: "0 auto" }}>
          <TableContainer sx={{ 'tr td': { border: 0 }, width: "300px" }}>
            {firstColumn.map((item) => (
              <TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.value}</TableCell>
              </TableRow>
            ))}
          </TableContainer>
          <TableContainer sx={{ 'tr td': { border: 0 }, width: "300px" }}>
            {secondColumn.map((item) => (
              <TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.value}</TableCell>
              </TableRow>
            ))}
          </TableContainer>
          <Grid style={{ width: "500px", marginTop: "20px", fontSize: "large", lineHeight: "25px", marginLeft: "20px" }}>
            {offer.description}
          </Grid>
        </Grid>
      </Grid>
    </MainContent >
  );
}

export default Offer;