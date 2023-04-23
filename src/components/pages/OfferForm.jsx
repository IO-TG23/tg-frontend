import React, { useEffect, useState } from "react";
import MainContent from "../common/MainContent";
import { useNavigate } from "react-router-dom";
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
    const [gearbox, setGeabox] = React.useState('select');
    const [drive, setDrive] = React.useState('select');
    const [pricelow, setPricelow] = React.useState('');

    const navigate = useNavigate();

    return (
        <MainContent>
            <Typography variant="h4" component="div" >
                Pojazd
            </Typography>
            <Grid container justifyContent="space-around" style={{ background: "lightgray", padding: 20, marginTop: 10, marginBottom: 20, borderRadius: 30, gap: 5 }}>
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
                        <MenuItem value="select"><em>Wybierz</em></MenuItem>
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
                        <MenuItem value="select"><em>Wybierz</em></MenuItem>
                        <MenuItem value="awd">awd</MenuItem>
                        <MenuItem value="rwd">rwd</MenuItem>
                        <MenuItem value="fwd">fwd</MenuItem>
                    </Select>
                </Grid>
                <Grid container xs={3.5} direction="column" style={{ gap: 10 }}>
                    <TextField
                        label="Ilość drzwi"
                        type="text"
                        color="primary"
                        placeholder="Ilość drzwi"
                    />
                    <TextField
                        label="Ilość siedzeń"
                        type="text"
                        color="primary"
                        placeholder="Ilość siedzeń"
                    />
                    <TextField
                        label="Pojemność bagażnika [l]"
                        type="text"
                        color="primary"
                        placeholder="Pojemność"
                    />
                    <TextField
                        label="Długość [mm]"
                        type="text"
                        color="primary"
                        placeholder="Długość"
                    />
                    <TextField
                        label="Wysokość [mm]"
                        type="text"
                        color="primary"
                        placeholder="Wysokość"
                    />
                    <TextField
                        label="Szerokość [mm]"
                        type="text"
                        color="primary"
                        placeholder="Szerokość"
                    />
                </Grid>
                <Grid container xs={3.5} direction="column" style={{ gap: 10 }}>
                    <TextField
                        label="Rok rozpoczęcia produkcji"
                        type="text"
                        color="primary"
                        placeholder="Rok rozpoczęcia"
                    />
                    <TextField
                        label="Rok zakończenia produkcji"
                        type="text"
                        color="primary"
                        placeholder="Rok zakończenia"
                    />
                    <TextField
                        label="Rozstaw osi [mm]"
                        type="text"
                        color="primary"
                        placeholder="Rozstaw osi"
                    />
                    <TextField
                        label="Rozstaw kół - tył [mm]"
                        type="text"
                        color="primary"
                        placeholder="Rozstaw kół"
                    />
                    <TextField
                        label="Rozstaw kół - przód [mm]"
                        type="text"
                        color="primary"
                        placeholder="Rozstaw kół"
                    />
                    <TextField
                        label="Opis pojazdu"
                        type="text"
                        color="primary"
                        placeholder="Opis pojazdu"
                    />
                </Grid>
            </Grid>

            <Typography variant="h4" component="div">
                Oferta
            </Typography>
            <Grid container direction="column" xs={4} justifyContent="space-between" style={{ background: "lightgray", padding: 30, marginTop: 10, borderRadius: 20, gap: 10 }}>
                <TextField
                    label="Cena"
                    type="text"
                    color="primary"
                    placeholder="Cena"
                />
                <TextField
                    label="Opis oferty"
                    type="text"
                    color="primary"
                    placeholder="Opis"
                />
                <TextField
                    label="Email"
                    type="email"
                    color="primary"
                    placeholder="Email"
                />
                <TextField
                    label="Numer telefonu"
                    type="text"
                    color="primary"
                    placeholder="+48 123 456 789"
                />
            </Grid>
        </MainContent >
    );
}

export default OfferForm;
