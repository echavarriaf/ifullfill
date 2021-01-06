import "./Home.css";

import React from "react";

export default function Home() {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1>iFullFill</h1>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <h2>Dashboard</h2>
        </div>
        <div className="col-sm-4">
          <h2>Locations</h2>
        </div>
        <div className="col-sm-4">
          <h2>Cadres</h2>
        </div>
      </div>
    </div>
  );
}
