import React, {useContext} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Remedy from './views/Remedy/Remedy.js';
import Admin from './views/Admin/Admin.js';
import { useAuth0 } from "./react-auth0-spa";

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <NavBar />
      <Switch>
        <Route
        exact path = "/Home" 
        component = {Home}/>}
        />
        <Route exact path="/Register" component={Remedy} />
        <Route exact path = "/Admin" component = {Admin}></Route>

        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
