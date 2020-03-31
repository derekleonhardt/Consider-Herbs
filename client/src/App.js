import React, {useContext} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Remedy from './views/Remedy/Remedy.js';
import Board from "./views/Chat/Board.js";
import Chat from "./views/Chat/Chat.js";
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
        <Route exact path="/">
         <Redirect to="/Home" />
        </Route>
        <Route exact path="/Chat" component={Board}>
        </Route>
        <Route exact path="/Chat/Post" component={Chat}>
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
