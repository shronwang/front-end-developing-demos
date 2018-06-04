import React, { Component } from 'react';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import News from "./News";
import Images from "./Images";

class App extends Component {
  render() {
    return (
      <HashRouter>     
        <div>
        <h2>React Router Example</h2>
         <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/news">News</NavLink></li>
            <li><NavLink to="/images">Images</NavLink></li>
          </ul>
          <div className="content">
             <Route exact path="/" component={Home} />
             <Route path="/news" component={News} /> 
             <Route path="/images" component={Images} /> 
          </div> 
        </div>
      </HashRouter>
    );
  }
}

export default App;
