import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../App";

/**
 * @description Component with logic for logging out (mostly redirection)
 * @returns JSX.Element
 */
function Logout() {
  const navigate = useNavigate();
  const { setManageAccountState } = useContext(AccountContext);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("clientId");
    localStorage.removeItem("email");

    setManageAccountState({
      loggedIn: false,
    });
    setTimeout(() => {
      navigate({
        pathname: "/",
      });
    }, 0);
  }, []);
  return <></>;
}

export default Logout;
