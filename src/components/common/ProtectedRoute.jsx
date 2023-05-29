import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function ProtectedRoute({ component }) {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    // if (!jwtToken) {
    //   navigate({
    //     pathname: "/",
    //   });
    // }

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

export default ProtectedRoute;
