import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function ProtectedRoute({ component }) {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    if (!jwtToken) {
      navigate({
        pathname: "/",
      });
    }

    //TODO: make request to verify token
  }, []);
  return <>{component}</>;
}

export default ProtectedRoute;
