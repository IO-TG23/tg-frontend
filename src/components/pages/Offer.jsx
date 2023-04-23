import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainContent from "../common/MainContent";
import {
  Breadcrumbs,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  Typography,
} from "@mui/material";
import axios from "axios";

function Offer() {
  const [car, setCar] = useState([]);
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
    try {
      //const request = await axios.get(
      //    `${import.meta.env.REACT_APP_BACKEND_URL}/...`, {}
      //);
      fetch("../../../example.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          setCar(json.find((element) => element.title == params.id));
        });
    } catch (err) {}
  }, []);

  return (
    <MainContent>
      <Breadcrumbs separator=">">{breadCrumbs}</Breadcrumbs>
      <ImageList>
        <ImageListItem key={car.image ? car.image : car.title}>
          <img
            src={car.image ? car.image + "?w=248&fit=crop&auto=format" : ""}
            alt={car.title ? car.title : ""}
            loading="lazy"
          />
          <ImageListItemBar
            title={<b>{car.title ? car.title : ""}</b>}
            subtitle={
              <p>
                {car.class ? car.class : ""}{" "}
                {car.start_production ? car.start_production : ""}
              </p>
            }
            position="below"
          />
        </ImageListItem>
      </ImageList>
    </MainContent>
  );
}

export default Offer;
