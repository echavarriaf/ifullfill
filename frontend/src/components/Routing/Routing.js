import React, { Component } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";

import Navbar from '../NavBar/Navbar';
import Dashboard from '../Dashboard/Dashboard';

class Routing extends Component {
    render() {
        return (
            <Router>
                <Navbar />
                <Route path="/dashboard" component={Dashboard} />
            </Router>
        )
    }
}

export default Routing;
