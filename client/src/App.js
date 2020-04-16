import React, {useEffect, useState} from 'react';
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
const setAuthUserRole = (userId,role,config, access) => {
  let id = [config.subscriberId, config.premiumId, config.adminId];
  let newRole;
  switch(role.toLowerCase()){
    case "admin":
      newRole = config.adminId;
      break;
    case "subscriber":
      newRole = config.subscriberId;
      break;
    case "premium":
      newRole = config.premiumId;
      break;
  }

  //delete all other roles
fetch(`https://${config.domain}/api/v2/users`,{
        // "mode": 'no-cors',
        method: "DELETE",
        headers: {
          "authorization": "Bearer " + access.access_token,
          "content-type": "application/json",
        },
        body:{
          'roles': id
        }}).then(res => console.log(res.json()))
        .catch(rej=>console.log(rej)
  );

  // fetch(`https://${props.config.domain}/api/v2/users`,{
  //       headers: {authorization: "Bearer " + props.access.access_token}
  //       }).then(res => res.json().then(data => {
  //           setUserList(data);
  //           setDefaultUserList(data);
  //       })).catch(rej=>console.log(rej)
  // );
}
const App = (props) => {
  const { loading, user, isAuthenticated} = useAuth0();
  const [userRole, setUserRole] = useState("guest");
  const [access, setAccess] = useState(null);
  const config = props.config;

  if (loading) {
    return <div>Loading...</div>;
  }

  //pages tier system
  const TheHome = isAuthenticated ? UserHome : Home;
  // const 

  if (!access){
    fetch('http://127.0.0.1:5000/auth/access')
    .then(res=>res.json().then(data => setAccess(data)))
    .catch(reas=>console.log(reas));
  }
  if (access && isAuthenticated){
    setAuthUserRole(user.sub, "subscriber", config, access);
    //get the users role
    fetch(`https://${props.config.domain}/api/v2/users/${user.sub}/roles`,{
      headers: {authorization: "Bearer " + access.access_token}
    }).then(res => res.json().then(data => {
        if(data.length > 0)
          setUserRole(data[0].name.toLowerCase());
        else{
          setUserRole("subscriber");
          setAuthUserRole(user.sub, "subscriber", config, access);
        }
          console.log(user);
    })).catch(rej=>console.log(rej));
  }
  return (
    <div>
      <NavBar isAuthenticated = {isAuthenticated} user = {user} userRole = {userRole}/>
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
        userRole = {userRole}
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
