import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

/**
 * @description Component that is used with Route to protect certain functionalities and make them accessible only for logged in users
 * @param {component} param0 
 * @returns JSX.Element
 */
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
