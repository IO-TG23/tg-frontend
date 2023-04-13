import { ThemeProvider, createTheme } from "@mui/material";
import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Privacy from "./components/pages/Privacy";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Logout from "./components/pages/Logout";
import ResetPassword from "./components/pages/ResetPassword";

const theme = createTheme({
  palette: {
    primary: {
      main: "#80301c",
    },
  },
});

const initialAccountState = {
  loggedIn: false,
};

export const AccountContext = createContext(null);

function App() {
  const [manageAccountState, setManageAccountState] = useState({
    ...initialAccountState,
  });

  return (
    <AccountContext.Provider
      value={{ state: manageAccountState, setManageAccountState }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/privacy" Component={Privacy} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/logout" Component={Logout} />
            <Route path="/resetpassword" Component={ResetPassword} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AccountContext.Provider>
  );
}

export default App;
