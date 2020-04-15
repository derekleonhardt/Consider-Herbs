import React, {useEffect, useState} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Remedy from './views/Remedy/Remedy.js';
import Admin from './views/Admin/Admin.js';
import Book from './views/Book/Book.js'
import Browse from "./views/Browse/Browse.js"
import Chat from './views/Chat/Chat.js'
import Edit from './views/Chat/Edit.js'
import Footer from "./components/Footer";
import UserHome from "./views/UserHome/UserHome.js";
import { useAuth0 } from "./react-auth0-spa";
import request from 'request';
import "./App.css"
import { get } from 'mongoose';

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
  const { loading, user, isAuthenticated, getTokenSilently} = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [access, setAccess] = useState(null);
  const config = props.config;

  useEffect(() => { //check to see if user has already logged in
    const callAPI = async () => {
      try{
        const token = await getTokenSilently();
        // console.log(token);
      }catch(e){
        // console.log(e);
      }
    };
    if (!loading) {
      callAPI();
    }
  }, [loading, getTokenSilently]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const TheHome = isAuthenticated ? UserHome : Home;
  
  if (!access){
    fetch('http://127.0.0.1:5000/auth/access')
    .then(res=>res.json().then(data => setAccess(data)))
    .catch(reas=>console.log(reas));
  }
  if (access && isAuthenticated){
    //get the users role
    fetch(`https://${props.config.domain}/api/v2/users/${user.sub}/roles`,{
      headers: {authorization: "Bearer " + access.access_token}
    }).then(res => res.json().then(data => {
      if(data.filter(role => role.name === "Admin").length > 0)
        setIsAdmin(true);
    })).catch(rej=>console.log(rej));
  }
  return (
    <div>
      <NavBar isAuthenticated = {isAuthenticated} user = {user} isAdmin = {isAdmin}/>
      <Switch>
        <Route path = "/Home" render = {(props) => <TheHome
          user = {user}
        />}></Route>
        <Route path = "/Admin" render = {(props) => <Admin
        defaultGlossary = {defaultGlossary}
        searchGlossary = {searchGlossary}
        access = {access}
        config = {config}
        isAuthenticated = {isAuthenticated}
        isAdmin = {isAdmin}
        />}></Route>
        <Route exact path = "/Book" component = {Book}></Route>
        <Route exact path = "/Chat" component = {Chat}></Route>
        <Route path = "/Chat/:pid" component = {Chat}></Route>
        <Route exact path = "/Write" component = {Edit}></Route>
        <Route path = "/Edit/:pid" component = {Edit}></Route>
        <Route exact path="/Remedy" component={Remedy}/>
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
