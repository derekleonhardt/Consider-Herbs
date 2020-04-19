import React, {useEffect, useState} from 'react';
import {Router, Route, Switch, Redirect  } from 'react-router-dom';
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
import Checkout from "./views/Checkout/Checkout";
import NoAccount from "./views/NoAccount/NoAccount";
import { useAuth0 } from "./react-auth0-spa";
import "./App.css"
import { get, PromiseProvider } from 'mongoose';
import { createBrowserHistory } from 'history'

const defaultGlossary = (setResults) => {
  fetch(`http://127.0.0.1:5000/api/db/glossary/`).then(
          (response)=>{
              (response.json().then(data =>{
                  setResults(data.data);
          }))
  });
}
const searchGlossary = (e, setResults) =>{
  if (e.target.value.replace(/\s/g,'') != ''){
      fetch(`http://127.0.0.1:5000/api/db/glossary/search/${e.target.value}`).then(
          (response)=>{
              (response.json().then(data =>{
                  setResults(data.data);
              }))
      });
  }else defaultGlossary(setResults);
}
const getContentDbListings = async (contentType, page, setListings) =>{
  let requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };
  let info;
  fetch(`http://localhost:5000/api/db/${contentType}/page/${page}`, requestOptions)
  .then(response => response.json().then(data=>{
      if (data){
        if(!Array.isArray(data.data))
          setListings([data.data]);
        else
          setListings(data.data); 
      }
  }));
}
const deleteAuthUserRole = (userId,roles = [],config, access) => {
  let roleId = roles.map((role) =>{
    switch(role.toLowerCase()){
      case "admin":
        return config.adminId;
      case "subscriber":
        return config.subscriberId;
      case "premium":
        return config.premiumId;
    }
  });
  //delete roles
  fetch(`https://${config.domain}/api/v2/users/${userId}/roles`,{
          method: "DELETE",
          headers: {
            "authorization": "Bearer " + access.access_token,
            "content-type": "application/json"
          },
          body: JSON.stringify({"roles": roleId})
        })
          .catch(rej=>console.log(rej)
    );
}
const setAuthUserRole = (userId,role,config, access) => {
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
  //add new users here
  fetch(`https://${config.domain}/api/v2/roles/${newRole}/users`,{
    method:"POST",
    headers: {
      authorization: "Bearer " + access.access_token,
    "content-type": "application/json"},
    body: JSON.stringify({users: [userId]})
  })
  .then(res => res.json().then(data => {
  }))
  .catch(rej=>console.log(rej));
}

const getAuthUserRole = (userId, config, setRole, access) => {
  //get a list of users
  fetch(`https://${config.domain}/api/v2/users/${userId}/roles`,{
    headers: {authorization: "Bearer " + access.access_token}
  }).then(res => res.json().then(data => {
      if(data.length > 0){
        setRole(data[0].name.toLowerCase());
      }
      else{
        setRole("subscriber");
        setAuthUserRole(userId, "subscriber", config, access);
      }
  })).catch(rej=>console.log(rej));
}
const history = createBrowserHistory();

const App = (props) => {
  const { loading, user, isAuthenticated} = useAuth0();
  const [userRole, setUserRole] = useState("guest");
  const [access, setAccess] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const config = props.config;

  if (loading) {
    return <div>Loading...</div>;
  }

  //pages tier system
  const TheHome = isAuthenticated ? UserHome : Home;
  const TheRemedy = (isAuthenticated && (userRole === "admin" || userRole === "premium")) ? Remedy : NoAccount; 
  const TheBooking = isAuthenticated ? Book : NoAccount;
  const TheAdmin = (isAuthenticated && userRole === "admin") ? Admin : NoAccount;

  if (!access){
    fetch('http://127.0.0.1:5000/auth/access')
    .then(res=>res.json().then(data => setAccess(data)))
    .catch(reas=>console.log(reas));
  }
  if (access && isAuthenticated){
    //get the users role
    getAuthUserRole(user.sub, config, setUserRole, access);
  }
  return (
    <div>
      <NavBar isAuthenticated = {isAuthenticated} 
        user = {user} 
        userRole = {userRole}
        domain = {config.domain}
      />
      <Switch>
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route path = "/Home" render = {(props) => <TheHome
          user = {user}
        />}></Route>
        <Route path = "/Admin" render = {(props) => <TheAdmin
        defaultGlossary = {defaultGlossary}
        searchGlossary = {searchGlossary}
        access = {access}
        config = {config}
        isAuthenticated = {isAuthenticated}
        user = {user}
        userRole = {userRole}
        getAuthUserRole = {getAuthUserRole}
        deleteAuthUserRole = {deleteAuthUserRole}
        setAuthUserRole = {setAuthUserRole}
         getDbListings = {getContentDbListings}
        />}></Route>
        <Route exact path = "/Book" render={()=>(<TheBooking selectProduct={setSelectedProduct}/>)}></Route>
        {/* Chat needs to be looked at by hosung */}
        <Route exact path = "/Chat" render = {() => <Chat
          user = {user}
          userRole = {userRole}
        />}></Route>
        <Route path = "/Chat/:pid" render = {() => <Chat
          user = {user}
          userRole = {userRole}
        />}></Route>
        <Route exact path = "/Write" component = {Edit}></Route>
        <Route path = "/Edit/:pid" component = {Edit}></Route>
        <Route exact path="/Remedy" component={TheRemedy}/>
        <Route path = "/Browse" render = {(props) => <Browse
        searchGlossary = {searchGlossary}
        defaultGlossary = {defaultGlossary}
        userRole = {userRole}
        />}></Route>
        <Route path ="/Checkout"
              render={()=> (<Checkout selectedProduct={selectedProduct}/>)}/>
        <Route component={NotFound}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
