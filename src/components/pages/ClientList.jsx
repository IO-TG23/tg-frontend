import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainContent from "../common/MainContent";
import {
    Grid,
    TableContainer,
    TableRow,
    TableCell,
    Button
} from "@mui/material";
import axios from "axios";

const clients = [
    { email: "anikeenkovera@filevino.com" },
    { email: "lumikki@muzhskaiatema.com" },
    { email: "gsandyd@besttimenews.xyz" },
    { email: "having2nds@emvil.com" },
    { email: "anoopmehr@aboody000.site" },
    { email: "braddu@eewmaop.com" },
    { email: "cyyg5hwu@ffffw.club" },
    { email: "tv75bopfizw@accutaneonlinesure.com" },
    { email: "mrrola2007@artinterpretation.org" }
]

function ClientList() {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        try {
            //const request = await axios.get(
            //    `${import.meta.env.REACT_APP_BACKEND_URL}/Clients`, {}
            //);
            //setData(request.data.message)
            setData(clients)
        } catch (err) { }
    }, []);


    return (
        <MainContent>
            <Grid container style={{ width: "500px", margin: "0 auto", padding: "5px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} direction="column" >
                <TableContainer>
                    {data.map((client) => (
                        <TableRow>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="large"
                                    sx={{ width: "7vw", height: "1.5vw", margin: "0.3vw 0 0 0.3vw", fontSize: "0.8vw" }}
                                >
                                    Usuń
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableContainer>
            </Grid>
        </MainContent >
    );
}

export default ClientList;