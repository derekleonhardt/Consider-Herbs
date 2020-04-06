import React, {useContext, useState} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Remedy from './views/Remedy/Remedy.js';
import Admin from './views/Admin/Admin.js';
import Book from './views/Book/Book.js'
import Browse from "./views/Browse/Browse.js"
import Footer from "./components/Footer";
import UserHome from "./views/UserHome/UserHome.js";
import { useAuth0 } from "./react-auth0-spa";
import "./App.css"

const defaultGlossary = (setResults) => {
  fetch(`http://127.0.0.1:5000/api/db/glossary/`).then(
          (response)=>{
              (response.json().then(data =>{
                  setResults(data);
          }))
  });
}
const searchGlossary = (e, setResults) =>{
  if (e.target.value.replace(/\s/g,'') != ''){
      fetch(`http://127.0.0.1:5000/api/db/glossary/search/${e.target.value}`).then(
          (response)=>{
              (response.json().then(data =>{
                  setResults(data);
              }))
      });
  }else defaultGlossary(setResults);
}

const App = () => {
  const { loading, user, isAuthenticated } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <NavBar isAuthenticated = {isAuthenticated}/>
      <Switch>
        <Route
        exact path = "/Home" 
        component = {Home}/>}
        />
        <Route exact path="/Register" component={Remedy} />
        <Route exact path="/Remedy" component={Remedy}/>
        <Route exact path="/UserHome" component={UserHome}/>

        <Route path = "/Admin" render = {(props) => <Admin
        defaultGlossary = {defaultGlossary}
        searchGlossary = {searchGlossary}
        />}></Route>
        <Route exact path = "/Book" component = {Book}></Route>

        <Route path = "/Browse" render = {(props) => <Browse
        searchGlossary = {searchGlossary}
        defaultGlossary = {defaultGlossary}
        />}></Route>
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
