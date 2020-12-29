import React from "react";
import { Component } from "react";
import { Pie } from "react-chartjs-2";
// import { Pie, Bar, Line } from "react-chartjs-2";

import "./Piechart.css";

class Piechart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["Boston", "New York", "Bedford"],
        datasets: [
          {
            label: "Population",
            data: [617594, 181045, 106519],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
            ],
          },
        ],
      },
    };
  }

  render() {
    return (
      <>
        <div className="chart">
          <Pie
            data={this.state.chartData}
            options={{
              title: {
                display: true,
                text: "Largest Cities",
                fontSize: 25,
              },
              legend: {
                display: true,
                position: "bottom",
              },
            }}
          />
        </div>
      </>
    );
  }
}

export default Piechart;
