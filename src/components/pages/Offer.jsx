import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import MainContent from "../common/MainContent";
import { MdImportExport } from "react-icons/md";
import { AccountContext } from "../../App";

import {
  Breadcrumbs,
  Grid,
  Link,
  Typography,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  SliderThumb,
  IconButton,
} from "@mui/material";
import axios from "axios";

const cars = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/VW_Polo_1.2_TDI_BlueMotion_%28V%29_%E2%80%93_Frontansicht%2C_7._M%C3%A4rz_2011%2C_D%C3%BCsseldorf.jpg/400px-VW_Polo_1.2_TDI_BlueMotion_%28V%29_%E2%80%93_Frontansicht%2C_7._M%C3%A4rz_2011%2C_D%C3%BCsseldorf.jpg",
    id: 1,
    vehicle: {
      name: "Volkswagen Polo",
      gearbox: "manual",
      drive: "rwd",
      numberOfDoors: 4,
      numberOfSeats: 5,
      bootCapacity: 280,
      length: 4053,
      height: 1451,
      width: 1751,
      productionStartYear: 2009,
      productionEndYear: 2017,
      wheelBase: 2564,
      backWheelTrack: 1520,
      frontWheelTrack: 1495,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam facilisis commodo fringilla. Vivamus at erat sit amet tellus sagittis interdum eu id turpis. Mauris malesuada, neque finibus sollicitudin auctor, eros mi volutpat urna, at ornare arcu ipsum eget nibh. Sed elementum dolor eget ipsum varius aliquet. ",
    },
    price: 7500,
    description:
      "Vivamus vitae metus at lacus euismod mollis ut pellentesque diam. Integer faucibus tincidunt sem id vestibulum. Suspendisse laoreet auctor vulputate. Fusce congue metus nec imperdiet placerat. Aenean nec enim ex. Aliquam sed diam in massa vehicula pretium ac et nisl.",
    contactEmail: "KamilNowak@interia.pl",
    contactPhoneNumber: "123 456 789",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/2011_Audi_A7_%284G%29_3.0_TDI_quattro_hatchback_%282015-06-27%29_01.jpg/400px-2011_Audi_A7_%284G%29_3.0_TDI_quattro_hatchback_%282015-06-27%29_01.jpg",
    id: 2,
    vehicle: {
      name: "Audi A7",
      gearbox: "manual",
      drive: "awd",
      numberOfDoors: 4,
      numberOfSeats: 5,
      bootCapacity: 535,
      length: 4976,
      height: 1423,
      width: 1908,
      productionStartYear: 2010,
      productionEndYear: 2018,
      wheelBase: 2930,
      backWheelTrack: 1636,
      frontWheelTrack: 1651,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam facilisis commodo fringilla. Vivamus at erat sit amet tellus sagittis interdum eu id turpis. Mauris malesuada, neque finibus sollicitudin auctor, eros mi volutpat urna, at ornare arcu ipsum eget nibh. Sed elementum dolor eget ipsum varius aliquet. ",
    },
    price: 95700,
    description:
      "Vivamus vitae metus at lacus euismod mollis ut pellentesque diam. Integer faucibus tincidunt sem id vestibulum. Suspendisse laoreet auctor vulputate. Fusce congue metus nec imperdiet placerat. Aenean nec enim ex. Aliquam sed diam in massa vehicula pretium ac et nisl.",
    contactEmail: "MarcinKowal@interia.pl",
    contactPhoneNumber: "331 558 921",
  },
];

function Offer() {
  const [offer, setOffer] = React.useState({ vehicle: {} });
  const [firstColumn, setFirstColumn] = React.useState([]);
  const [secondColumn, setSecondColumn] = React.useState([]);
  const params = useParams();

  const [breadCrumbs, setBreadCrumbs] = useState([
    <Link href="/">Dom</Link>,
    <Link href="/offerlist">Oferty</Link>,
  ]);

  const exportOffer = async () => {
    //'w miejsce guida ID oferty'
    const email = localStorage.getItem("email");

    try {
      await axios.post(
        `${
          import.meta.env.REACT_APP_BACKEND_URL
        }/Offer/export/${"61e3f736-356c-4d37-951a-1028aa079012"}`,
        { email }
      );

      alert("Eksport zakończony powodzeniem");
    } catch (e) {
      alert(
        "Eksport nieudany, spróbuj ponownie bądź skontaktuj się z administratorem"
      );
    }
  };

  const {
    state: { loggedIn },
  } = useContext(AccountContext);

  useEffect(() => {
    setBreadCrumbs((prev) => [
      ...prev,
      <Typography key="3">{params.id}</Typography>,
    ]);

    try {
      //const request = await axios.get(
      //    `${import.meta.env.REACT_APP_BACKEND_URL}/Offer/{id}`, {}
      //);
      var car = cars.find((offer) => offer.id == params.id);
      if (car) {
        console.log(JSON.stringify(car));
        setOffer(car);
        let firstColumn = [
          { name: "Ilość drzwi", value: car.vehicle.numberOfDoors },
          { name: "Ilość siedzeń", value: car.vehicle.numberOfSeats },
          { name: "Pojemność bagażnika", value: car.vehicle.bootCapacity },
          { name: "Długość", value: car.vehicle.length },
          { name: "Wysokość", value: car.vehicle.height },
          { name: "Szerokość", value: car.vehicle.width },
        ];
        setFirstColumn(firstColumn);

        let secondColumn = [
          {
            name: "Rok rozpoczęcia produkcji",
            value: car.vehicle.productionStartYear,
          },
          {
            name: "Rok zakończenia produkcji",
            value: car.vehicle.productionEndYear,
          },
          { name: "Rozstaw osi", value: car.vehicle.wheelBase },
          { name: "Rozstaw kół - tył", value: car.vehicle.backWheelTrack },
          { name: "Rozstaw kół - przód", value: car.vehicle.frontWheelTrack },
        ];
        setSecondColumn(secondColumn);
      }
    } catch (err) {}
  }, []);

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
            src={offer.image}
            alt={offer.vehicle.name}
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
            Nazwa: {offer.vehicle.name}
            <br />
            Cena: {offer.price}
            <br />
            Skrzynia biegów: {offer.vehicle.gearbox}
            <br />
            Napęd: {offer.vehicle.drive}
            <br />
            Email: {offer.contactEmail}
            <br />
            Numer telefonu: {offer.contactPhoneNumber}
            <br />
            <br />
            {offer.vehicle.description}
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
            {offer.description}
          </Grid>
          {loggedIn && (
            <Grid container flexDirection={"column"}>
              <Grid item>
                <Typography variant="h6">Akcje</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  color="primary"
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                  }}
                  onClick={exportOffer}
                >
                  <MdImportExport />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </MainContent>
  );
}

export default Offer;
