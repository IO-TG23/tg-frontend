import React from "react";
import { Grid, Typography } from "@mui/material";
import LocationMap from "../common/LocationMap";
import MainContent from "../common/MainContent";
import HomeCard from "../common/HomeCard";

/**
 * @description Home page
 * @returns JSX.Element
 */
function Home() {
  return (
    <MainContent>
      <Typography variant="h4" textAlign={"center"}>
        Strona domowa
      </Typography>

      <Grid
        container
        rowGap={2}
        columnGap={2}
        columnSpacing={2}
        justifyContent={"center"}
        m={2}
      >
        <Grid item md={3.5} xs={9}>
          <HomeCard
            href={"offerlist"}
            image={
              "https://images.unsplash.com/photo-1605434896830-431366e0c702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80"
            }
            title={"Oferty"}
          />
        </Grid>
        <Grid item md={3.5} xs={9}>
          <HomeCard
            href={"myaccount"}
            image={
              "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            }
            title={"Moje konto"}
          />
        </Grid>
        <Grid item md={3.5} xs={9}>
          <HomeCard
            href={"privacy"}
            image={
              "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80"
            }
            title={"Prywatność"}
          />
        </Grid>
      </Grid>
      <Typography variant="h4" textAlign={"center"}>
        Lokalizacja
      </Typography>
      <LocationMap
        position={[50.066739, 19.913095]}
        popupMessage={"Tutaj jesteśmy!"}
      />
    </MainContent>
  );
}

export default Home;
