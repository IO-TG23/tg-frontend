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
    GetData()
  }, [])

  const GetData = async (id) => {
    try {
      const request = await axios.get(
        `${import.meta.env.REACT_APP_BACKEND_URL}/Offer`, {});
      setData(request.data.message.filter(item => item.vehicle.clientId == localStorage.getItem("clientId")))
    } catch (err) {
      console.log(err)
      alert("Błąd pobrania ofert, spróbuj ponownie bądź skontaktuj się z administratorem");
    }
  };

  const DeleteOffer = async (id) => {
    try {
      const request = await axios.delete(
        `${import.meta.env.REACT_APP_BACKEND_URL}/Offer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );

      setTimeout(() => {
        navigate({
          pathname: "/mycars",
        });
      }, 1000);

    } catch (err) {
      console.log(err)
      alert("Błąd usunięcia oferty, spróbuj ponownie bądź skontaktuj się z administratorem");
    }
  };

  return (
    <MainContent>
      <Grid>
        <ImageList style={{ flexDirection: "column" }} cols={1}>
          {data.map((item) => (
            <ImageListItem alignitems="center" justifycontent="center" style={{ flexDirection: "row", marginBottom: 20 }}>
              <Grid style={{ backgroundImage: `url(${item.image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", width: "42vw" }}>
              </Grid>
              <Grid container direction="column" style={{ width: "13vw", height: "23vw", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <Typography style={{ fontSize: "0.7vw", marginLeft: "5px" }}>
                  Nazwa: {item.vehicle.name}<br />
                  Cena: {item.price}<br />
                  Skrzynia biegów: {item.vehicle.gearbox}<br />
                  Napęd: {item.vehicle.drive}<br />
                  Ilość drzwi: {item.vehicle.numberOfDoors}<br />
                  Ilość siedzeń: {item.vehicle.numberOfSeats}<br />
                  Pojemność bagażnika: {item.vehicle.bootCapacity}<br />
                  Długość: {item.vehicle.length}<br />
                  Wysokość: {item.vehicle.height}<br />
                  Szerokość: {item.vehicle.width}<br />
                  Rok rozpoczęcia produkcji: {item.vehicle.productionStartYear}<br />
                  Rok zakończenia produkcji: {item.vehicle.productionEndYear}<br />
                  Rozstaw osi: {item.vehicle.wheelBase}<br />
                  Rozstaw kół - tył: {item.vehicle.backWheelTrack}<br />
                  Rozstaw kół - przód: {item.vehicle.frontWheelTrack}<br />
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ width: "7vw", height: "1.5vw", margin: "0.3vw 0 0 0.3vw", fontSize: "0.8vw" }}
                  onClick={() => {
                    navigate("/offerform", {
                      state: {
                        id: item.id,
                        vehicle: {
                          name: item.vehicle.name,
                          gearbox: item.vehicle.gearbox,
                          drive: item.vehicle.drive,
                          numberOfDoors: item.vehicle.numberOfDoors,
                          numberOfSeats: item.vehicle.numberOfSeats,
                          bootCapacity: item.vehicle.bootCapacity,
                          length: item.vehicle.length,
                          height: item.vehicle.height,
                          width: item.vehicle.width,
                          productionStartYear: item.vehicle.productionStartYear,
                          productionEndYear: item.vehicle.productionEndYear,
                          wheelBase: item.vehicle.wheelBase,
                          backWheelTrack: item.vehicle.backWheelTrack,
                          frontWheelTrack: item.vehicle.frontWheelTrack,
                          description: item.vehicle.description
                        },
                        price: item.price,
                        description: item.description,
                        email: item.contactEmail,
                        phone: item.contactPhoneNumber
                      }
                    })
                  }}
                >
                  Edytuj
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  sx={{ width: "7vw", height: "1.5vw", margin: "0.3vw 0 0 0.3vw", fontSize: "0.8vw" }}
                  onClick={() => {
                    DeleteOffer(item.id)
                  }}
                >
                  Usuń
                </Button>
              </Grid>
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </MainContent >
  );
}

export default MyCars;
