import { ThemeProvider, createTheme } from "@mui/material";
import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import OfferList from "./components/pages/OfferList";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Privacy from "./components/pages/Privacy";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Logout from "./components/pages/Logout";
import ResetPassword from "./components/pages/ResetPassword";
import Offer from "./components/pages/Offer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#80301c",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
  },
});

const initialAccountState = {
  loggedIn: false,
};

export const AccountContext = createContext(null);
export const AppContext = createContext(null);

function App() {
  const [manageAccountState, setManageAccountState] = useState({
    ...initialAccountState,
  });

  const [openDrawerMenu, setOpenDrawerMenu] = useState(false);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  return (
    <AppContext.Provider
      value={{
        state: {
          openDrawerMenu,
          setOpenDrawerMenu,
          openAccountMenu,
          setOpenAccountMenu,
        },
      }}
    >
      <AccountContext.Provider
        value={{ state: manageAccountState, setManageAccountState }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/offerlist" Component={OfferList} />
              <Route path="/about" Component={About} />
              <Route path="/privacy" Component={Privacy} />
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
              <Route path="/logout" Component={Logout} />
              <Route path="/resetpassword" Component={ResetPassword} />

              <Route path="/offer/:id" Component={Offer} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AccountContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
