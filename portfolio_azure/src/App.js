import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import SortingVisualiser from './SortingVisualiser'
import Maze from './Maze'
import Home from './Home'

import './index.css';

class App extends Component {

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  };

  closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "unset";
  }

  toggleMenuIcon() {
    var element = document.getElementById("MenuIconContainer");
    var ele2 = document.getElementById("mySidenav");
    if (ele2.style.width == '' || ele2.style.width == '0px') {
      this.openNav();
    } else {
      this.closeNav();
    }
    element.classList.toggle("change");
  }

  render() {
    return (
      <Router>
        <div id="main">
          <div id="myTopnav" className="topnav">
            <div className="collapsetopnav">
              <a href="/">Home</a>
              <Link to="/Maze">Maze</Link>
              <a href="/SortingVisualiser">SortingVisualiser</a>
            </div>
            <div id="MenuIconContainer" className="Open" onClick={() => this.toggleMenuIcon()}>
              <div id="menuIconBar1"></div>
              <div id="menuIconBar2"></div>
              <div id="menuIconBar3"></div>
            </div>
          </div>

          <div id="mySidenav" className="sidenav">
            <a href="/">Home</a>
            <a href="/Maze">Maze</a>
            <a href="/SortingVisualiser">SortingVisualiser</a>
          </div>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Home/>
              </Route>
            <Route path="/Maze">
              <Maze/>
            </Route>
            <Route path="/SortingVisualiser">
              <SortingVisualiser/>
            </Route>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;