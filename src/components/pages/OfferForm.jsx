import React, { useEffect, useState } from "react";
import MainContent from "../common/MainContent";
import { useLocation } from "react-router-dom";
import {
  Select,
  MenuItem,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";

function OfferForm() {
  const [name, setName] = React.useState("");
  const [gearbox, setGeabox] = React.useState("select");
  const [drive, setDrive] = React.useState("select");
  const [numberOfDoors, setNumberOfDoors] = React.useState("");
  const [numberOfSeats, setNumberOfSeats] = React.useState("");
  const [bootCapacity, setBootCapacity] = React.useState("");
  const [length, setLength] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [width, setWidth] = React.useState("");
  const [productionStartYear, setProductionStartYear] = React.useState("");
  const [productionEndYear, setProductionEndYear] = React.useState("");
  const [wheelBase, setWheelBase] = React.useState("");
  const [backWheelTrack, setBackWheelTrack] = React.useState("");
  const [frontWheelTrack, setFrontWheelTrack] = React.useState("");
  const [vehicleDescription, setVehicleDescription] = React.useState("");
  const [clientId, setClientId] = React.useState("");

  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const location = useLocation();

  useEffect(() => {
    setClientId(localStorage.getItem("clientId"));

    if (location.state) {
      setName(location.state.vehicle.name);
      setGeabox(location.state.vehicle.gearbox);
      setDrive(location.state.vehicle.drive);
      setNumberOfDoors(location.state.vehicle.numberOfDoors);
      setNumberOfSeats(location.state.vehicle.numberOfSeats);
      setBootCapacity(location.state.vehicle.bootCapacity);
      setLength(location.state.vehicle.length);
      setHeight(location.state.vehicle.height);
      setWidth(location.state.vehicle.width);
      setProductionStartYear(location.state.vehicle.productionStartYear);
      setProductionEndYear(location.state.vehicle.productionEndYear);
      setWheelBase(location.state.vehicle.wheelBase);
      setBackWheelTrack(location.state.vehicle.backWheelTrack);
      setFrontWheelTrack(location.state.vehicle.frontWheelTrack);
      setVehicleDescription(location.state.vehicle.description);

      setPrice(location.state.price);
      setDescription(location.state.description);
      setEmail(location.state.email);
      setPhone(location.state.phone);
    }
  }, []);

  const details_column1 = [
    {
      label: "Ilość drzwi",
      placeholder: "Ilość drzwi",
      function: setNumberOfDoors,
      value: numberOfDoors,
    },
    {
      label: "Ilość siedzeń",
      placeholder: "Ilość siedzeń",
      function: setNumberOfSeats,
      value: numberOfSeats,
    },
    {
      label: "Pojemność bagażnika [l]",
      placeholder: "Pojemność",
      function: setBootCapacity,
      value: bootCapacity,
    },
    {
      label: "Długość [mm]",
      placeholder: "Długość",
      function: setLength,
      value: length,
    },
    {
      label: "Wysokość [mm]",
      placeholder: "Wysokość",
      function: setHeight,
      value: height,
    },
    {
      label: "Szerokość [mm]",
      placeholder: "Szerokość",
      function: setWidth,
      value: width,
    },
  ];

  const details_column2 = [
    {
      label: "Rok rozpoczęcia produkcji",
      placeholder: "Rok rozpoczęcia",
      function: setProductionStartYear,
      value: productionStartYear,
    },
    {
      label: "Rok zakończenia produkcji",
      placeholder: "Rok zakończenia",
      function: setProductionEndYear,
      value: productionEndYear,
    },
    {
      label: "Rozstaw osi [mm]",
      placeholder: "Rozstaw osi",
      function: setWheelBase,
      value: wheelBase,
    },
    {
      label: "Rozstaw kół - tył [mm]",
      placeholder: "Rozstaw kół",
      function: setBackWheelTrack,
      value: backWheelTrack,
    },
    {
      label: "Rozstaw kół - przód [mm]",
      placeholder: "Rozstaw kół",
      function: setFrontWheelTrack,
      value: frontWheelTrack,
    },
  ];

  const offer = [
    {
      label: "Cena",
      placeholder: "Cena",
      function: setPrice,
      value: price,
      type: "text",
    },
    {
      label: "Email",
      placeholder: "Email",
      function: setEmail,
      value: email,
      type: "email",
    },
    {
      label: "Numer telefonu",
      placeholder: "+48 123 456 789",
      function: setPhone,
      value: phone,
      type: "tel",
    },
  ];

  const AddOffer = async () => {
    try {
      let vehicle = {
        name: name,
        description: vehicleDescription,
        productionStartYear: productionStartYear,
        productionEndYear: productionEndYear,
        numberOfDoors: numberOfDoors,
        numberOfSeats: numberOfSeats,
        bootCapacity: bootCapacity,
        length: length,
        height: height,
        width: width,
        wheelBase: wheelBase,
        backWheelTrack: backWheelTrack,
        frontWheelTrack: frontWheelTrack,
        gearbox: gearbox,
        drive: drive,
        clientId: clientId,
      };

      let offer = {
        vehicle: vehicle,
        price: price,
        description: description,
        contactEmail: email,
        contactPhoneNumber: phone,
      };
      console.log(offer);
      await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/Offer`,
        {
          ...offer,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      alert(err);
    }
  };

  return (
    <MainContent>
      <Typography variant="h4" component="div">
        Pojazd
      </Typography>
      <Grid
        container
        justifyContent="space-around"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          padding: 20,
          marginTop: 10,
          marginBottom: 20,
          gap: 5,
        }}
      >
        <Grid container xs={3} justifyContent="center">
          <Typography variant="h5" component="div">
            Dane podstawowe
          </Typography>
        </Grid>
        <Grid container xs={7.5} justifyContent="center">
          <Typography variant="h5" component="div">
            Dane szczegółowe
          </Typography>
        </Grid>
        <Grid container xs={3} direction="column" style={{ gap: 10 }}>
          <TextField
            label="Nazwa"
            type="text"
            color="primary"
            placeholder="Nazwa"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <Typography variant="h7" component="div">
            Skrzynia biegów
          </Typography>

          <Select
            id="gearbox"
            value={gearbox}
            sx={{ minWidth: 150 }}
            onChange={(event) => {
              setGeabox(event.target.value);
            }}
          >
            <MenuItem value="select">
              <em>Wybierz</em>
            </MenuItem>
            <MenuItem value="manual">manualna</MenuItem>
            <MenuItem value="automatic">automatyczna</MenuItem>
          </Select>

          <Typography variant="h7" component="div">
            Napęd
          </Typography>
          <Select
            id="drive"
            value={drive}
            sx={{ minWidth: 150 }}
            onChange={(event) => {
              setDrive(event.target.value);
            }}
          >
            <MenuItem value="select">
              <em>Wybierz</em>
            </MenuItem>
            <MenuItem value="awd">awd</MenuItem>
            <MenuItem value="rwd">rwd</MenuItem>
            <MenuItem value="fwd">fwd</MenuItem>
          </Select>
        </Grid>
        <Grid container xs={3.5} direction="column" style={{ gap: 10 }}>
          {details_column1.map((item) => (
            <TextField
              label={item.label}
              type="number"
              color="primary"
              value={item.value}
              placeholder={item.placeholder}
              onChange={(event) => {
                item.function(event.target.value);
              }}
            />
          ))}
        </Grid>
        <Grid container xs={3.5} direction="column" style={{ gap: 10 }}>
          {details_column2.map((item) => (
            <TextField
              label={item.label}
              type="number"
              color="primary"
              value={item.value}
              placeholder={item.placeholder}
              onChange={(event) => {
                item.function(event.target.value);
              }}
            />
          ))}

          <TextField
            label="Opis pojazdu"
            type="text"
            color="primary"
            value={vehicleDescription}
            multiline
            rows={3}
            placeholder="Opis"
            onChange={(event) => {
              setVehicleDescription(event.target.value);
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h4" component="div">
        Oferta
      </Typography>
      <Grid
        container
        direction="column"
        xs={4}
        justifyContent="space-between"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          padding: 30,
          marginTop: 10,
          marginBottom: 20,
          gap: 10,
        }}
      >
        {offer.map((item) => (
          <TextField
            label={item.label}
            type={item.type}
            color="primary"
            value={item.value}
            placeholder={item.placeholder}
            onChange={(event) => {
              item.function(event.target.value);
            }}
          />
        ))}
        <TextField
          label="Opis oferty"
          type="text"
          color="primary"
          value={description}
          multiline
          rows={5}
          placeholder="Opis"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          AddOffer();
        }}
      >
        Wyślij ofertę
      </Button>
    </MainContent>
  );
}

export default OfferForm;
