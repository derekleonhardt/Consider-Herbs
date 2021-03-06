import React, {useEffect, useState} from 'react';
import {Router, Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Remedy from './views/Remedy/Remedy.js';
import Chat from "./views/Chat/Chat.js";
import Admin from './views/Admin/Admin.js';
import Book from './views/Book/Book.js'
import Browse from "./views/Browse/Browse.js"
import Edit from './views/Chat/Edit.js'
import Footer from "./components/Footer";
import UserHome from "./views/UserHome/UserHome.js";
import Checkout from "./views/Checkout/Checkout";
import NoAccount from "./views/NoAccount/NoAccount";
import Subscribe from "./views/Checkout/Subscribe";
import Loading from "./components/Loading";
import { useAuth0 } from "./react-auth0-spa";
import "./App.css"
import { createBrowserHistory } from 'history'

const defaultGlossary = (setResults) => {
  fetch(`/api/db/glossary/`).then(
          (response)=>{
              (response.json().then(data =>{
                  setResults(data.data);
          }))
  });
}
const searchGlossary = (e, setResults) =>{
  if (e.target.value.replace(/\s/g,'') != ''){
      fetch(`/api/db/glossary/search/${e.target.value}`).then(
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
  fetch(`/api/db/${contentType.toLowerCase()}/page/${page}`, requestOptions)
  .then(response => response.json().then(data=>{
      if (data){
        if(!Array.isArray(data.data))
          setListings([data.data]);
        else
          setListings(data.data); 
      }
  }));
}
const updateContentDbListings = async (contentType, listingInfo) =>{
  let requestOptions = {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(listingInfo)
  };
  fetch(`/api/db/${contentType.toLowerCase()}/update/${listingInfo.id}`, requestOptions)
  .then(response => response.json().then(data => console.log(data)))
  .catch(err => console.log(err));
}
const deleteContentDbListings = async (contentType, id) =>{
  let requestOptions = {
    method: "DELETE",
  };
  fetch(`/api/db/${contentType.toLowerCase()}/delete/${id}`, requestOptions)
  .then(response => {
    response.text();
    return response.text();
  })
  .catch(err => console.log(err));
}
const addContentDbListings = async (contentType, listingInfo) =>{
    let requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(listingInfo)
    };
    fetch(`/api/db/${contentType.toLowerCase()}/insert/`, requestOptions)
    .then(response => response.json().then(data => console.log(data)))
    .catch(err => console.log(err));
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
const defaultRecipe = (setResults) => {
  fetch(`/api/db/recipe/extended`).then(
          (response)=>{
              (response.json().then(data =>{
                  setResults(data.data);
          }))
  });
}

const getRecipe = (id) => {
  fetch(`/api/db/recipe/id/`+id).then(
          (response)=>{
              (response.json().then(data =>{
                  const test = data.data.Ingredients.map(ingredient=>{
                    return(
                      <p>{ingredient.IngName}</p>
                    );
                      console.log(ingredient.IngName);
                      console.log(ingredient.Amounut);
                      console.log(ingredient.Units);
                  })
          }))
  });
}

const searchRecipeByBody = (e, setResults) =>{
  if (e.target.value.replace(/\s/g,'') != ''){
      fetch(`/api/db/recipe/body/${e.target.value}`).then(
          (response)=>{
              (response.json().then(data =>{
                  setResults(data.data);
              }))
      });
  }else defaultRecipe(setResults);
}

const searchRecipe = (e, setResults) =>{
  if (e.target.value.replace(/\s/g,'') != ''){
      fetch(`/api/db/recipe/search/${e.target.value}`).then(
          (response)=>{
              (response.json().then(data =>{
                  setResults(data.data);
              }))
      });
  }else defaultRecipe(setResults);
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
  .then(res => {
    res.json().then(data => {
  })
  console.log(res)})
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
    return <Loading/>;
  }

  //pages tier system
  const TheHome = isAuthenticated ? UserHome : Home;
  const TheRemedy = (isAuthenticated && (userRole === "admin" || userRole === "premium")) ? Remedy : NoAccount; 
  const TheBooking = isAuthenticated ? Book : NoAccount;
  const TheAdmin = (isAuthenticated && userRole === "admin") ? Admin : NoAccount;

  if (!access){
    fetch('/auth/access')
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
          getDbListings = {getContentDbListings}
        />}></Route>
        <Route exact path="/Register" component={Remedy} />
        <Route path = "/Remedy" render = {(props) => <TheRemedy
        searchRecipeByBody = {searchRecipeByBody}
        searchRecipe = {searchRecipe}
        defaultRecipe = {defaultRecipe}
        getRecipe = {getRecipe}
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
        updateDbListings = {updateContentDbListings}
        deleteDbListings = {deleteContentDbListings}
        addDbListings = {addContentDbListings}
        />}></Route>
        <Route exact path = "/Book" render={()=>(<TheBooking 
        selectProduct={setSelectedProduct}
        userRole = {userRole}
        />)}></Route>
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
        <Route exact path = "/Subscribe"  render = {() => <Subscribe
          user = {user}
          userRole = {userRole}
          config = {config}
          access = {access}
          setAuthUserRole = {setAuthUserRole}
          deleteAuthUserRole = {deleteAuthUserRole}
          setUserRole = {setUserRole}
        />}></Route>
        <Route component={NotFound}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
