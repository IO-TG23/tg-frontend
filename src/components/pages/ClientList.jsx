import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainContent from "../common/MainContent";
import {
    Grid,
    TableContainer,
    TableRow,
    TableCell,
    Button,
    Select,
    MenuItem
} from "@mui/material";
import axios from "axios";

function ClientList() {
    const [data, setData] = React.useState([]);
    const [selectedClients, setSelectedClients] = React.useState([]);
    const [role, setRole] = React.useState('select');

    useEffect(() => {
        GetClients()
    }, []);

    const GetClients = async () => {
        try {
            const request = await axios.get(
                `${import.meta.env.REACT_APP_BACKEND_URL}/Client`, {}
            );
            setData(request.data.message)
        } catch (err) { console.log(err) }
    };

    const DeleteClient = async (id, email, rowNode) => {
        try {
            const request = await axios.delete(
                `${import.meta.env.REACT_APP_BACKEND_URL}/Client/${id}`, {});
            rowNode.remove()
            setSelectedClients(selectedClients.filter(item => item !== email))
            alert("Usunięto klienta!")
        } catch (err) {
            console.log(err)
            alert(JSON.stringify(err.response.data.messages))
        }
    };

    const RemoveUserFromRole = async (email) => {
        try {
            const request = await axios.delete(
                `${import.meta.env.REACT_APP_BACKEND_URL}/Auth/removeUserFromRole`, {
                email: email,
                role: role
            });
        } catch (err) {
            console.log(err)
        }
    };

    const AssignUserToRole = async (email) => {
        try {
            const request = await axios.post(
                `${import.meta.env.REACT_APP_BACKEND_URL}/Auth/assignUserToRole`, {
                email: email,
                role: role
            });
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <MainContent>
            <Grid container style={{ width: "500px", minHeight: "100px", margin: "0 auto", padding: "5px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} direction="column" >
                <TableContainer>
                    {data?.map((client) => (
                        <TableRow style={{ width: "100%" }}>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    onChange={(event) => {
                                        if (event.target.checked)
                                            setSelectedClients(current => [...current, client.email])
                                        else
                                            setSelectedClients(selectedClients.filter(item => item !== client.email))
                                    }}
                                />
                            </TableCell>
                            <TableCell sx={{ width: "240px" }}>
                                {client.email}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="large"
                                    sx={{ width: "120px", height: "30px", margin: "10px 0 0 10px" }}
                                    onClick={(event) => {
                                        DeleteClient(client.id, client.email, event.target.parentNode.parentNode)
                                    }}
                                >
                                    Usuń
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableContainer>
                <Grid>
                    <Button
                        variant="contained"
                        color="error"
                        size="large"
                        sx={{ width: "150px", height: "30px", margin: "0 0 0 10px" }}
                        onClick={() => {
                            if (role == "select")
                                alert("Wybierz rolę!")
                            else
                                selectedClients.forEach(email => RemoveUserFromRole(email))
                        }}
                    >
                        Usuń rolę
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ width: "150px", height: "30px", margin: "0 0 0 10px" }}
                        onClick={() => {
                            if (role == "select")
                                alert("Wybierz rolę!")
                            else
                                selectedClients.forEach(email => AssignUserToRole(email))
                        }}
                    >
                        Dodaj rolę
                    </Button>
                    <Select
                        id="role"
                        value={role}
                        sx={{ width: "150px", margin: "10px 0 10px 10px" }}
                        onChange={(event) => {
                            setRole(event.target.value);
                        }}
                    >
                        <MenuItem value="select"><em>Wybierz</em></MenuItem>
                        <MenuItem value="Employee">Pracownik</MenuItem>
                        <MenuItem value="Admin">Administrator</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        </MainContent >
    );
}

export default ClientList;