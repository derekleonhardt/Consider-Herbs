import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import "./auth0.css";

const Auth0 = (props) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  let getUrl = (window.location);
  let baseUrl = getUrl .protocol + "//" + getUrl.host + "/";
  return (
    <>
      {!isAuthenticated && (
        <a href = "#" className = "login" onClick={() => loginWithRedirect({})}>Log in</a>
      )}

      {isAuthenticated && <a href = {`https://${props.domain}/v2/logout?returnTo=${baseUrl}`} className = "login" onClick={() => logout()}>Log out</a>}
    </>
  );
};

export default Auth0;