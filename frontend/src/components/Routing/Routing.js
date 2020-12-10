import React, { Component } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";

import Navbar from '../NavBar/Navbar';

class Routing extends Component {
    render() {
        return (
            <Router>
                <Navbar />
            </Router>
        )
    }
}

export default Routing;
