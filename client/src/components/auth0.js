import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import "./auth0.css";

const Auth0 = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <a href = "#" className = "login" onClick={() => loginWithRedirect({})}>Log in</a>
      )}

      {isAuthenticated && <a href = "#" className = "login" onClick={() => logout()}>Log out</a>}
    </>
  );
};

export default Auth0;