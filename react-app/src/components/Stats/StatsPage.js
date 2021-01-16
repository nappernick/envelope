import React from 'react'
import Violinplot from './ViolinPlot'
import AutoSizer from "react-virtualized-auto-sizer";

function StatsPage() {
    return (
        <div className="stats__page container" style={{ display: "flex", justifyContent: "center" }}>
            <div className="stats__duration">
                <div className="stats__duration header">
                    Duration
                </div>
                <div className="stats__duration graph" style={{ width: "28vw", height: "50vh" }}>
                    <Violinplot statsField={"duration"} />
                </div>
            </div>
            <div className="stats__dont_knows">
                <div className="stats__dont_knows header">
                    Don't Know Responses
                </div>
                <div className="stats__dont_knows graph" style={{ width: "28vw", height: "50vh" }}>
                    <Violinplot statsField={"num_dont_know_responses"} />
                </div>
            </div>
            <div className="stats_outliers">
                <div className="stats__outliers header">
                    Integer Outliers
                </div>
                <div className="stats__outliers graph" style={{ width: "28vw", height: "50vh" }}>
                    <Violinplot statsField={"num_outlier_data_points"} />
                </div>
            </div>
        </div>
    )
}

export default StatsPage
