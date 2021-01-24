import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import HealthAreaSelector from './HealthAreas/HealthAreaSelector';
import Map from './Map'
import "./MapPage.css"
import { calculateZoom } from './MapUtils';

function MapPage() {
    const { userId, projectId } = useParams()
    const projects = useSelector(store => store.projects)
    const [viewport, setViewport] = useState({
        latitude: 6.30953127139638,
        longitude: 14.808780033196266,
        zoom: 2.8,
        bearing: 0,
        pitch: 0
    });
    const [project, setProject] = useState({})
    const [data, setData] = useState(null);
    const [healthAreas, setHealthAreas] = useState([])
    const [selectedHA, setSelectedHA] = useState(null)
    const [healthAreaName, setHealthAreaName] = useState('')
    const [amountColor, setAmountColor] = useState("red")
    const [haSurveyCount, setHaSurveyCount] = useState(0)
    const [surveyCoveragePercent, setSurveyCoveragePercent] = useState(0)

    useEffect(() => {
        const fetchHealthArea = async () => {
            let has = await (fetch(`/api/data/${userId}/projects/${projectId}/health-areas`))
            let hasRes = await has.json()
            setHealthAreas(hasRes)
        }
        fetchHealthArea()
        // Set the selected project for use in map header
        projects.forEach(proj => {
            if (proj.id === parseInt(projectId)) setProject(proj)
        })
    }, []);

    useEffect(() => {
        const fetchMapData = async () => {

            let surveys = await fetch(`/api/data/projects/1/health-areas/${selectedHA}/map`)
            let surveysData = await surveys.json()
            // Set the amount for the map header
            if (project && surveysData["count_surveys"]) setSurveyCoveragePercent(parseFloat(surveysData["count_surveys"] / project.target_surv_count * 100).toFixed(2))
            // Set the percentage's color based on the surveyCoveragePercent
            if (parseFloat(surveysData["count_surveys"] / project.target_surv_count * 100).toFixed(2) >= 100) setAmountColor("green")
            if (parseFloat(surveysData["count_surveys"] / project.target_surv_count * 100).toFixed(2) < 100) setAmountColor("red")
            setData(surveysData)
            setHaSurveyCount(surveysData["count_surveys"])
            // Querying for where to center the map based on the Health Area
            let center = await fetch(`/api/data/projects/1/health-areas/${selectedHA}/center`)
            let centerData = await center.json()
            // Setting up local variables for zoom calculations
            let centerLat = centerData[0]
            let centerLong = centerData[1]
            let latDiff = centerData[2]
            let longDiff = centerData[3]
            calculateZoom(latDiff, longDiff)
            let viewZoom = calculateZoom(latDiff, longDiff)
            setViewport({
                latitude: centerLat,
                longitude: centerLong,
                zoom: viewZoom,
                bearing: 0,
                pitch: 0
            })
        }
        // Set the name of the selected HA for map header
        healthAreas.forEach(healthArea => {
            if (healthArea.id === parseInt(selectedHA)) setHealthAreaName(healthArea.name)
        })
        if (healthAreas.length) fetchMapData()
    }, [selectedHA]);

    return (
        <div className="map__map_and_selector container">
            <div className="map__map">
                <div className="map__selected_ha_survey_count container">
                    <div className="map__selected_ha_survey_count header">
                        {selectedHA ?
                            (<div className="health_area_coverage_container" >
                                <div className="health_area_coverage_header container">
                                    <div className="health_area_coverage title">Survey Coverage in {healthAreaName}</div>
                                    {surveyCoveragePercent ? <div className={`health_area_coverage amount ${amountColor}`}>{surveyCoveragePercent}%</div> : <></>}
                                </div>
                                <div className="health_area_coverage_detail container">
                                    <div className="health_area_coverage_detail detail">
                                        {`${haSurveyCount} Surveys / ${project.target_surv_count} Target`}
                                    </div>
                                </div>
                            </div>)
                            : ""
                        }
                    </div>
                </div>
                <Map allData={data} viewport={viewport} setViewport={setViewport} />
            </div>
            <div className="map__health_area_selector">
                <HealthAreaSelector healthAreas={healthAreas} setSelectedHA={setSelectedHA} selectedHA={selectedHA} />
            </div>
        </div>
    )
}

export default MapPage
