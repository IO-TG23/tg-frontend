import React, { useEffect, useState } from "react";
import MainContent from "../common/MainContent";
import { useNavigate } from "react-router-dom";
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    FormControlLabel,
    RadioGroup,
    Radio,
    Typography,
    TextField,
    Button,
    Grid
} from "@mui/material";
import axios from "axios";


function OfferList() {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        try {
            //const request = await axios.get(
            //    `${import.meta.env.REACT_APP_BACKEND_URL}/...`, {}
            //);
            fetch('../../../example.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    setData(json)
                });
        } catch (err) { }
    }, [])

    return (
        <MainContent>
            <Grid container justifyContent="space-between" alignItems="flex-start" >
                <Grid item xs={2}>

                    <Typography variant="h6" component="div">
                        Skrzynia biegów
                    </Typography>
                    <RadioGroup name="gearbox">
                        <FormControlLabel value="manualna" control={<Radio />} label="manual" />
                        <FormControlLabel value="automatyczna" control={<Radio />} label="automatic" />
                    </RadioGroup>
                    <br />
                    <Typography variant="h6" component="div">
                        Napęd
                    </Typography>
                    <RadioGroup name="drive">
                        <FormControlLabel value="awd" control={<Radio />} label="awd" />
                        <FormControlLabel value="rwd" control={<Radio />} label="rwd" />
                        <FormControlLabel value="fwd" control={<Radio />} label="fwd" />
                    </RadioGroup>
                    <br />
                    <Typography variant="h6" component="div">
                        Cena
                    </Typography>
                    <Grid container direction="row" justifyContent="space-evenly">
                        <Grid item xs={5}>
                            <TextField
                                label="Od"
                                type="text"
                                color="primary"
                                placeholder="Od"
                            />
                        </Grid>
                        <Grid item xs={1} style={{ textAlign: "center", margin: "auto" }}>-</Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Do"
                                type="text"
                                color="primary"
                                placeholder="Do"
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Wyszukaj
                    </Button>

                </Grid>
                <Grid item xs={9.7}>
                    <ImageList style={{ flexDirection: "column" }} cols={3}>
                        {data.map((item) => (
                            <ImageListItem
                                key={item.image ? item.image : item.title}

                                onClick={() => {
                                    navigate({
                                        pathname: item.image ? "/offer/" + item.title : "/offerlist",
                                    });
                                }}
                            >
                                <img
                                    src={item.image ? item.image + "?w=248&fit=crop&auto=format" : ""}
                                    alt={item.title ? item.title : ""}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={<b>{item.title ? item.title : ""}</b>}
                                    subtitle={<p>{item.class ? item.class : ""} {item.start_production ? item.start_production : ""}</p>}
                                    position="below"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
        </MainContent >
    );
}

export default OfferList;
