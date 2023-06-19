import React, { useEffect, useState } from "react";
import MainContent from "../common/MainContent";
import { useNavigate } from "react-router-dom";
import {
  ImageList,
  ImageListItem,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";

function MyCars() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async (id) => {
    const clientId = localStorage.getItem("clientId");
    try {
      const request = await axios.get(
        `${import.meta.env.REACT_APP_BACKEND_URL}/Offer`,
        {}
      );
      setData([]);

      const ids = request.data.map((c) => c.id);

      for (const i of ids) {
        let requestData = await axios.get(
          `${import.meta.env.REACT_APP_BACKEND_URL}/Offer/${i}`,
          {}
        );
        if (requestData?.data?.clientId === clientId) {
          setData((prev) => [...prev, { ...requestData.data, id: i }]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteOffer = async (id) => {
    try {
      const request = await axios.delete(
        `${import.meta.env.REACT_APP_BACKEND_URL}/Offer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/mycars");
    } catch (err) {
      console.log(err);
      alert(JSON.stringify(err.response.data.messages));
    }
  };

  return (
    <MainContent>
      <Grid>
        <ImageList style={{ flexDirection: "column" }} cols={1}>
          {data?.map((item) => (
            <ImageListItem
              alignitems="center"
              justifycontent="center"
              style={{ flexDirection: "row", marginBottom: 20 }}
            >
              <Grid
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "42vw",
                }}
              ></Grid>
              <Grid
                container
                direction="column"
                style={{
                  width: "13vw",
                  height: "23vw",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                <Typography style={{ fontSize: "0.7vw", marginLeft: "5px" }}>
                  Nazwa: {item.vehicleName}
                  <br />
                  Cena: {item.price}
                  <br />
                  Skrzynia biegów: {item.vehicleGearbox}
                  <br />
                  Napęd: {item.drive}
                  <br />
                  Ilość drzwi: {item.numberOfDoors}
                  <br />
                  Ilość siedzeń: {item.numberOfSeats}
                  <br />
                  Pojemność bagażnika: {item.bootCapacity}
                  <br />
                  Długość: {item.length}
                  <br />
                  Wysokość: {item.height}
                  <br />
                  Szerokość: {item.width}
                  <br />
                  Rok rozpoczęcia produkcji: {item.productionStartYear}
                  <br />
                  Rok zakończenia produkcji: {item.productionEndYear}
                  <br />
                  Rozstaw osi: {item.wheelBase}
                  <br />
                  Rozstaw kół - tył: {item.backWheelTrack}
                  <br />
                  Rozstaw kół - przód: {item.frontWheelTrack}
                  <br />
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    width: "7vw",
                    height: "1.5vw",
                    margin: "0.3vw 0 0 0.3vw",
                    fontSize: "0.8vw",
                  }}
                  onClick={() => {
                    navigate(`/offerform?id=${item.id}`);
                  }}
                >
                  Edytuj
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  sx={{
                    width: "7vw",
                    height: "1.5vw",
                    margin: "0.3vw 0 0 0.3vw",
                    fontSize: "0.8vw",
                  }}
                  onClick={() => {
                    DeleteOffer(item.id);
                  }}
                >
                  Usuń
                </Button>
              </Grid>
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </MainContent>
  );
}

export default MyCars;
