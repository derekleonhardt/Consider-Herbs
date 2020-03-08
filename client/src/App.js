import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Remedy from './views/Remedy/Remedy.js';
import SignUp from "./components/Header/SignUp";

const App = () => {
  return (
    <div>
      <NavBar />
      <SignUp />
      <Switch>
        <Route exact path="/Home" component={Home} />
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
