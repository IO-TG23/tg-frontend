import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function HomeCard({ title, image, href }) {
  const navigate = useNavigate();

  const handleHrefClick = () => {
    navigate(href);
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleHrefClick}>
        <CardMedia component="img" height="200" image={image} alt={title} />
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HomeCard;
