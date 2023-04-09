import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../App";
function Logout() {
  const navigate = useNavigate();
  const { setManageAccountState } = useContext(AccountContext);

  useEffect(() => {
    localStorage.removeItem("token");
    setManageAccountState({
      loggedIn: false,
    });
    navigate({
      pathname: "/",
    });
  }, []);
  return <></>;
}

export default Logout;
