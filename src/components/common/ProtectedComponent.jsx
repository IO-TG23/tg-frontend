import React, { useEffect, useState } from "react";
import axios from "axios";

function ProtectedComponent({ component }) {
  const [navigable, setNavigable] = useState(true);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    if (!jwtToken) {
      setNavigable(false);
    } else {
      axios
        .post(`${import.meta.env.REACT_APP_BACKEND_URL}/Auth/verifyJwtToken`, {
          token: jwtToken,
        })
        .then((dt) => {
          if (dt.status !== 200) {
            setNavigable(false);
          }
        })
        .catch((_) => {
          setNavigable(false);
        });
    }
  }, []);
  return <>{navigable && component}</>;
}

export default ProtectedComponent;
