import React, {useContext} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Remedy from './views/Remedy/Remedy.js';
import { Auth0Context } from './contexts/auth0-context'
const App = () => {
  const auth0 = useContext(Auth0Context);
  return (
    <div>
      <button
      onClick = {auth0.loginWithRedirect}
      >
      Login
      </button>
      <NavBar />
      <Switch>
        <Route
        exact path = "/Home" 
        render = {(props) => <Home {...props} auth = {auth0}/>}
        />
        <Route exact path="/Register" component={Remedy} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
