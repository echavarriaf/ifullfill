import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Navbar from "../NavBar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import { Locations } from "../Locations/Locations";
import { Cadres } from "../Cadre/Cadre";
import Home from "../Home/Home";

class Routing extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/locations" component={Locations} />
        <Route path="/cadres" component={Cadres} />
        <Route path="/" component={Home} />
      </Router>
    );
  }
}

export default Routing;
