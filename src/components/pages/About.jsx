import React from "react";
import MainContent from "../common/MainContent";
import LocationMap from "../common/LocationMap";
import { Typography, Grid } from "@mui/material";
import TechnologyIcon from "../common/TechnologyIcon";
import {
  SiCplusplus,
  SiCsharp,
  SiDocker,
  SiDotnet,
  SiJavascript,
  SiMicrosoftazure,
  SiReact,
} from "react-icons/si";

function About() {
  return (
    <MainContent>
      <Typography variant="h4">O nas</Typography>
      <br />
      <Typography variant="h6">Informacje ogólne</Typography>
      <Typography>
        Projekt ten powstał w ramach przedmiotu Inżynieria Oprogramowania.
        Wszystkie zawarte w ramach platformy oferty mają charakter fikcyjny.
      </Typography>
      <Typography>
        W skład zespołu tworzącego projekt weszli:
        <ul>
          <li>Damian Łyszczarz</li>
          <li>Dawid Sroka</li>
          <li>Michał Rogowski</li>
          <li>Piotr Gębalski</li>
          <li>Piotr Ptak</li>
          <li>Weronika Wronka</li>
        </ul>
      </Typography>
      <Typography variant="h6">Technologie</Typography>
      <Typography>
        W ramach projektu wykorzystano następujące (główne) technologie:
        <span style={{ color: "tomato" }}>*</span>
        <Grid container>
          <TechnologyIcon
            icon={<SiCsharp color="purple" size="36px" />}
            href="https://dotnet.microsoft.com/en-us/languages/csharp"
          />
          <TechnologyIcon
            icon={<SiDotnet color="purple" size="36px" />}
            href="https://dotnet.microsoft.com/en-us/download"
          />
          <TechnologyIcon
            icon={<SiCplusplus color="green" size="36px" />}
            href="https://isocpp.org/"
          />
          <TechnologyIcon
            icon={<SiJavascript color="blue" size="36px" />}
            href="https://developer.mozilla.org/en-US/docs/Web/javascript"
          />
          <TechnologyIcon
            icon={<SiReact color="blue" size="36px" />}
            href="https://react.dev/"
          />
          <TechnologyIcon
            icon={<SiMicrosoftazure color="maroon" size="36px" />}
            href="https://azure.microsoft.com/pl-pl/"
          />
          <TechnologyIcon
            icon={<SiDocker color="maroon" size="36px" />}
            href="https://www.docker.com/"
          />
        </Grid>
      </Typography>
      <Typography variant="h6">Lokalizacja</Typography>
      <LocationMap
        position={[50.066739, 19.913095]}
        popupMessage={"Tutaj jesteśmy!"}
      />
    </MainContent>
  );
}

export default About;
