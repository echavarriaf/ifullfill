import "./Dashboard.css";
import React from "react";
// import { DemandOverdueTable } from "../DemandOverdue/DemandOverdueTable";
import Piechart from "../PieChart/Piechart";
import { Component } from "react";
import DemandOverdueTable from "../DemandOverdue/DemandOverdueTable";
import Loader from "../Loader/Loader";

const API = "http://localhost:5000";

// const Dashboard = (props) => {
class Dashboard extends Component {
  state = { loading: true };
  sleep = (miliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
  };

  wait = async (miliseconds = 5000) => {
    await this.sleep(miliseconds);
    this.setState({
      data: [{}],
      loading: false,
    });
  };

  fetGetRequests = () => {
    fetch(`${API}/dashboard`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          data: res,
          loading: false,
        });
        console.log(this.state.data);
      })
      .catch((error) => {
        console.log(error);
        this.wait();
      });
  };

  componentDidMount() {
    this.fetGetRequests();
    this.wait(5000);
    console.log(this.state);
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    let { data } = this.state;
    let details = { data };
    console.log(details);
    return (
      <div className="body">
        <div className="row">
          <div className="column left">
            <p>
              <span className="release">0</span> Resources due for release from
              Project
            </p>
          </div>

          <div className="column right">
            <div className="row">
              <div className="center">
                <span className="openproactive">0</span>
                <p>Open Proactive RR Requests</p>
              </div>
              <span className="vertical-line"></span>
              <div className="center">
                <span className="externalhiring">3</span>
                <p>Open External Hiring Requests</p>
              </div>
              <span className="vertical-line"></span>
              <div className="center">
                <span className="awaitingrpm">7</span>
                <p>Awaiting RPM Approval</p>
              </div>
              <span className="vertical-line"></span>
              <div className="center">
                <span className="colleaguesproposed">10</span>
                <p>Colleagues proposed against open RRs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="column second">
            <div className="row">
              <div className="center">
                <span className="rrtaggedtome">0</span>
                <p>RR Tagged to me</p>
              </div>
              <span className="vertical-line"></span>
              <div className="center">
                <span className="openproactiverr">1578</span>
                <p>Open Proactive RR</p>
              </div>
              <span className="vertical-line"></span>
              <div className="center">
                <span className="openreactiverr">3077</span>
                <p>Open Reactive RR</p>
              </div>
              <span className="vertical-line"></span>
              <div className="center">
                <span className="backfillrr">837</span>
                <p>Backfill RR</p>
              </div>
              <span className="vertical-line"></span>
              <div className="center">
                <span className="onholdrr">5486</span>
                <p>On Hold RR</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="column table">
            <DemandOverdueTable details={details} />
          </div>
        </div>

        <div className="row">
          <div className="column chart">
            <Piechart />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
