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

const cars = [
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/VW_Polo_1.2_TDI_BlueMotion_%28V%29_%E2%80%93_Frontansicht%2C_7._M%C3%A4rz_2011%2C_D%C3%BCsseldorf.jpg/400px-VW_Polo_1.2_TDI_BlueMotion_%28V%29_%E2%80%93_Frontansicht%2C_7._M%C3%A4rz_2011%2C_D%C3%BCsseldorf.jpg",
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
      description: "Opis pojazdu"
    },
    price: 7500,
    description: "Opis oferty",
    contactEmail: "KamilNowak@interia.pl",
    contactPhoneNumber: "123 456 789"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/2011_Audi_A7_%284G%29_3.0_TDI_quattro_hatchback_%282015-06-27%29_01.jpg/400px-2011_Audi_A7_%284G%29_3.0_TDI_quattro_hatchback_%282015-06-27%29_01.jpg",
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
      description: "Opis pojazdu"
    },
    price: 95700,
    description: "Opis oferty",
    contactEmail: "MarcinKowal@interia.pl",
    contactPhoneNumber: "331 558 921"
  }
]

function MyCars() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      //const request = await axios.get(
      //    `${import.meta.env.REACT_APP_BACKEND_URL}/...`, {}
      //);
      // setData(request.data.message)
      setData(cars)
    } catch (err) {

    }
  }, [])

  const deleteOffer = async (id) => {
    try {
      //const request = await axios.delete(
      //    `${import.meta.env.REACT_APP_BACKEND_URL}/Offer/{id}`, {}
      //);
      console.log("DELETE " + id)
    } catch (err) {
      //alert(request.data.message)
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
                    deleteOffer(item.id)
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
