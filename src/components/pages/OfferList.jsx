import React, { useEffect, useState } from "react";
import MainContent from "../common/MainContent";
import { useNavigate } from "react-router-dom";
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Select,
    MenuItem,
    Typography,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import axios from "axios";


function OfferList() {
    const [data, setData] = useState([]);
    const [gearbox, setGeabox] = React.useState('select');
    const [drive, setDrive] = React.useState('select');
    const [pricelow, setPricelow] = React.useState('');
    const [pricehigh, setPricehigh] = React.useState('');

    const navigate = useNavigate();

    useEffect(() => {
        try {
            //const request = await axios.get(
            //    `${import.meta.env.REACT_APP_BACKEND_URL}/GetOffers`, {}
            //);
            // setData(request.data.message)
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
        } catch (err) {
            //alert(request.data.message)
        }
    }, [])

    const search = async () => {
        try {
            let parameters = `pricelow=${pricelow ? pricelow : 0}`
            parameters += pricehigh ? `&pricehigh=${pricehigh}` : ''
            parameters += gearbox != 'select' ? `&gearbox=${gearbox}` : ''
            parameters += drive != 'select' ? `&drive=${drive}` : ''
            console.log(parameters)
            //const request = await axios.post(
            //    `${import.meta.env.REACT_APP_BACKEND_URL}/GetOffers?${parameters}`, {}
            //);
            // setData(request.data.message)

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
                    setData(json.filter(el =>
                        (pricelow ? el.start_production > parseInt(pricelow) : true) &&
                        (pricehigh ? el.start_production < parseInt(pricehigh) : true)
                    ))
                });
        } catch (err) {
            //alert(request.data.message)
        }
    };

    const validatePricelow = () => {
        return !pricelow || pricelow.match(/^[1-9]\d*$/)
    }

    const validatePricehigh = () => {
        return !pricehigh || pricehigh.match(/^[1-9]\d*$/)
    }

    return (
        <MainContent>
            <Grid container justifyContent="space-between" alignItems="flex-start" >
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            navigate({
                                pathname: "/offerform"
                            })
                        }}
                    >
                        Dodaj ofertę
                    </Button>
                    <br /><br />
                    <Typography variant="h6" component="div">
                        Skrzynia biegów
                    </Typography>

                    <Select
                        id="gearbox"
                        value={gearbox}
                        sx={{ minWidth: 150 }}
                        onChange={(event) => {
                            setGeabox(event.target.value)
                        }}
                    >
                        <MenuItem value="select"><em>Wybierz</em></MenuItem>
                        <MenuItem value="manual">manualna</MenuItem>
                        <MenuItem value="automatic">automatyczna</MenuItem>
                    </Select>
                    <br />
                    <Typography variant="h6" component="div">
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
                        <MenuItem value="select"><em>Wybierz</em></MenuItem>
                        <MenuItem value="awd">awd</MenuItem>
                        <MenuItem value="rwd">rwd</MenuItem>
                        <MenuItem value="fwd">fwd</MenuItem>
                    </Select>
                    <br />
                    <Typography variant="h6" component="div">
                        Cena
                    </Typography>
                    <Grid container direction="row" justifyContent="space-evenly">
                        <Grid item xs={5}>
                            <TextField
                                error={!validatePricelow()}
                                label="Od"
                                type="text"
                                color="primary"
                                placeholder="Od"
                                helperText={validatePricelow() ? " " : "Błędna wartość!"}
                                onBlur={(event) => {
                                    setPricelow(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={1} style={{ textAlign: "center", marginTop: 20 }}>-</Grid>
                        <Grid item xs={5}>
                            <TextField
                                error={!validatePricehigh()}
                                label="Do"
                                type="text"
                                color="primary"
                                placeholder="Do"
                                helperText={validatePricehigh() ? " " : "Błędna wartość!"}
                                onBlur={(event) => {
                                    setPricehigh(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={!validatePricehigh() || !validatePricelow()}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            search()
                        }}
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
