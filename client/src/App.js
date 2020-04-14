import React, {useContext, useState} from 'react';
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
  const [herbList, setHerbList] = useState(['']);

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
        <Route exact path="/Remedy" component={Remedy}/>

        <Route path = "/Admin" render = {(props) => <Admin
        defaultGlossary = {defaultGlossary}
        searchGlossary = {searchGlossary}
        />}></Route>
        <Route exact path = "/Book" component = {Book}></Route>
        <Route exact path = "/Chat" component = {Chat}></Route>
        <Route path = "/Chat/:pid" component = {Chat}></Route>
        <Route exact path = "/Write" component = {Edit}></Route>
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
