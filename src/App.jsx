import { ThemeProvider, createTheme } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import OfferList from "./components/pages/OfferList";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Privacy from "./components/pages/Privacy";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Logout from "./components/pages/Logout";
import ResetPassword from "./components/pages/ResetPassword";
import ChangePassword from "./components/pages/ChangePassword";
import Offer from "./components/pages/Offer";
import MyCars from "./components/pages/MyCars";
import MyAccount from "./components/pages/MyAccount";

import ProtectedRoute from "./components/common/ProtectedRoute";
import AppDial from "./components/common/AppDial";

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
  const [showNewOfferInfo, setShowNewOfferInfo] = useState(false);

  useEffect(() => {
    const sse = new EventSource(`${import.meta.env.REACT_APP_BACKEND_URL}/sse`);

    sse.onmessage = (msg) => {
      setShowNewOfferInfo(true);

      toast.info(msg.data, {
        autoClose: 3000,
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
      });

      setTimeout(() => {
        setShowNewOfferInfo(false);
      }, 6000);
    };

    sse.onerror = () => {
      console.error(
        "An error with SSE has occured, please contact your administrator."
      );
    };

    const jwtToken = localStorage.getItem("token");

    if (jwtToken) {
      setManageAccountState({
        loggedIn: true,
      });
    }

    return () => {
      sse.close();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        state: {
          openDrawerMenu,
          setOpenDrawerMenu,
          openAccountMenu,
          setOpenAccountMenu,
          showNewOfferInfo,
        },
      }}
    >
      <AccountContext.Provider
        value={{ state: manageAccountState, setManageAccountState }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Header />
            <ToastContainer />
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/offerlist" Component={OfferList} />
              <Route path="/about" Component={About} />
              <Route path="/privacy" Component={Privacy} />
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
              <Route path="/logout" Component={Logout} />
              <Route path="/resetpassword" Component={ResetPassword} />
              <Route path="/changepassword" Component={ChangePassword} />
              <Route
                path="/mycars"
                element={<ProtectedRoute component={<MyCars />} />}
              />
              <Route
                path="/myaccount"
                element={<ProtectedRoute component={<MyAccount />} />}
              />
              <Route path="/offer/:id" Component={Offer} />
            </Routes>
            <AppDial />
          </BrowserRouter>
        </ThemeProvider>
      </AccountContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
