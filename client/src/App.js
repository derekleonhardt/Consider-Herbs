import React, {useContext, useState} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Remedy from './views/Remedy/Remedy.js';
import Admin from './views/Admin/Admin.js';
import Browse from "./views/Browse/Browse.js"
import Footer from "./components/Footer";
import { useAuth0 } from "./react-auth0-spa";
import "./App.css"

const App = () => {
  const [herbList, setHerbList] = useState([]);

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
        <Route path = "/Browse" render = {(props) => <Browse 
        herbList = {herbList}
        setHerbList = {setHerbList}
        isAuthed = {true}/>}></Route>
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
