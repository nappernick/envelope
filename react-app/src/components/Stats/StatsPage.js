import React from 'react'
import Violinplot from './ViolinPlot'
import "./StatsPage.css"
import { useHistory } from 'react-router'

function StatsPage() {
    const history = useHistory()

    const handleStatsClick = (e) => {
        e.preventDefault()
        return history.push(`/users/1/projects/1/stats/by-enumerator`)
    }

    return (
        <div className="stats__page container" >
            <div className="stats__duration container">
                <div className="stats__duration header">
                    <p>Duration</p>
                </div>
                <div className="stats__duration graph" >
                    <Violinplot statsField={"duration"} />
                </div>
            </div>
            <div className="stats__dont_knows container">
                <div className="stats__dont_knows header">
                    <p>Don't Know Responses</p>
                </div>
                <div className="stats__dont_knows graph" >
                    <Violinplot statsField={"num_dont_know_responses"} />
                </div>
            </div>
            <div className="stats_outliers container">
                <div className="stats__outliers header">
                    <p>Integer Outliers</p>
                </div>
                <div className="stats__outliers graph" >
                    <Violinplot statsField={"num_outlier_data_points"} />
                </div>
            </div>
            <div className="project_card__stats button">
                <button onClick={handleStatsClick}>Stats</button>
            </div>
        </div>
    )
}

export default StatsPage
