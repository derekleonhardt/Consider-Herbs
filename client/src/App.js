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
import request from 'request';
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

const App = (props) => {
  const { loading, user, isAuthenticated } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [access, setAccess] = useState(undefined);
  console.log(props.config);
  if (loading) {
    return <div>Loading...</div>;
  }

  const TheHome = isAuthenticated ? UserHome : Home;
  
  if (!access){
    fetch('http://127.0.0.1:5000/auth/access')
    .then(res=>res.json().then(data => setAccess(data)))
    .catch(reas=>console.log(reas));
  }
  if(isAuthenticated){
    fetch(`${props.config.domain}/api/v2/user`,{
      method: 'GET',
      headers: {authorization: `'${access}'`}
    }).then(res => res.json().then(data => {
      console.log(data);
    })).catch(rej=>console.log(rej));
  }
  return (
    <div>
      <NavBar isAuthenticated = {isAuthenticated} user = {user} access = {access}/>
      <Switch>
        <Route path = "/Home" render = {(props) => <TheHome
          user = {user}
        />}></Route>
        <Route path = "/Admin" render = {(props) => <Admin
        defaultGlossary = {defaultGlossary}
        searchGlossary = {searchGlossary}
        access = {access}
        />}></Route>
        <Route exact path="/Remedy" component={Remedy}/>
        <Route exact path = "/Book" component = {Book}/>

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
