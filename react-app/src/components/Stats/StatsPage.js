import React from 'react'
import Violinplot from './ViolinPlot'
import AutoSizer from "react-virtualized-auto-sizer";

function StatsPage() {
    return (
        <div className="stats__page container" style={{ display: "flex", justifyContent: "center" }}>
            <div className="stats__duration container" style={{ width: "28vw", height: "50vh" }}>
                <Violinplot statsField={"duration"} />
            </div>
            <div className="stats__dont_knows container" style={{ width: "28vw", height: "50vh" }}>
                <Violinplot statsField={"num_dont_know_responses"} />
            </div>
            <div className="stats__outliers container" style={{ width: "28vw", height: "50vh" }}>
                <Violinplot statsField={"num_outlier_data_points"} />
            </div>
        </div>
    )
}

export default StatsPage
