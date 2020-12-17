import "./Dashboard.css";
import React from 'react'
import { DemandOverdueTable } from "../DemandOverdue/DemandOverdueTable";

// const { useEffect, Component } = require("react")

const Dashboard = (props) => {
    return (
        <div className="body">
            <div className="row">
                <div className="column left">
                    <p><span className="release">0</span> Resources due for release from Project</p>
                </div>

                <div className="column right">
                    <div className="row">
                        <div className="center">
                            <span className="openproactive">0</span>
                            <p>
                                Open Proactive RR Requests
                                </p>
                        </div>
                        <span className="vertical-line"></span>
                        <div className="center">
                            <span className="externalhiring">3</span>
                            <p>
                                Open External Hiring Requests
                                </p>
                        </div>
                        <span className="vertical-line"></span>
                        <div className="center">
                            <span className="awaitingrpm">7</span>
                            <p>
                                Awaiting RPM Approval
                                </p>
                        </div>
                        <span className="vertical-line"></span>
                        <div className="center">
                            <span className="colleaguesproposed">10</span>
                            <p>
                                Colleagues proposed against open RRs
                                </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="column second">
                    <div className="row">
                        <div className="center">
                            <span className="rrtaggedtome">0</span>
                            <p>
                                RR Tagged to me
                                </p>
                        </div>
                        <span className="vertical-line"></span>
                        <div className="center">
                            <span className="openproactiverr">1578</span>
                            <p>
                                Open Proactive RR
                                </p>
                        </div>
                        <span className="vertical-line"></span>
                        <div className="center">
                            <span className="openreactiverr">3077</span>
                            <p>
                                Open Reactive RR
                                </p>
                        </div>
                        <span className="vertical-line"></span>
                        <div className="center">
                            <span className="backfillrr">837</span>
                            <p>
                                Backfill RR
                                </p>
                        </div>
                        <span className="vertical-line"></span>
                        <div className="center">
                            <span className="onholdrr">5486</span>
                            <p>
                                On Hold RR
                                </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="column table">
                    <DemandOverdueTable />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

