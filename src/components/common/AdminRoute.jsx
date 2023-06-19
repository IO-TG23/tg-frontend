import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import jwtDecode from "jwt-decode";

function AdminRoute({ component }) {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    const decoded = jwtDecode(jwtToken);
    const roles =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const proper = jwtToken && (roles === "Admin" || roles.includes("Admin"));

    if (!proper) {
      navigate({
        pathname: "/",
      });
    }

    axios
      .post(`${import.meta.env.REACT_APP_BACKEND_URL}/Auth/verifyJwtToken`, {
        token: jwtToken,
      })
      .then((dt) => {
        if (dt.status !== 200) {
          navigate({
            pathname: "/",
          });
        }
      })
      .catch((_) => {
        navigate({
          pathname: "/",
        });
      });
  }, []);
  return <>{component}</>;
}

export default AdminRoute;
