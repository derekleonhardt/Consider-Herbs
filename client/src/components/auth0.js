import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import "./auth0.css";

const Auth0 = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <button className = "login" onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button className = "login" onClick={() => logout()}>Log out</button>}
    </>
  );
};

export default Auth0;