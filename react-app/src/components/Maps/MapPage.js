import React, { useState, useEffect, useMemo } from 'react'
import { trackPromise } from "react-promise-tracker";
import { useParams } from 'react-router-dom';
import { areas } from "../../common/areas";
import HealthAreaSelector from './HealthAreas/HealthAreaSelector';
import Map from './Map'
import "./MapPage.css"

function MapPage() {
    const { userId, projectId } = useParams()
    const [viewport, setViewport] = useState({
        latitude: 6.30953127139638,
        longitude: 14.808780033196266,
        zoom: 2.8,
        bearing: 0,
        pitch: 0
    });
    const [data, setData] = useState(null);
    const [healthAreas, setHealthAreas] = useState([])
    const [selectedHA, setSelectedHA] = useState(null)
    const [spinArea, setSpinArea] = useState(areas.mapButtons)
    const spinAreaObj = {
        "spinArea": spinArea,
        "setSpinArea": setSpinArea
    }

    useEffect(() => {
        const fetchHealthArea = async () => {
            // let has = await (fetch("/api/data/1/projects/1/health-areas"))
            let has = await (fetch(`/api/data/${userId}/projects/${projectId}/health-areas`))
            let hasRes = await has.json()
            setHealthAreas(hasRes)
        }
        fetchHealthArea()
    }, []);

    useEffect(() => {
        const fetchMapData = async () => {

            let surveys = await fetch(`/api/data/projects/1/health-areas/${selectedHA}/map`)
            let surveysData = await surveys.json()
            setData(surveysData)

            let center = await fetch(`/api/data/projects/1/health-areas/${selectedHA}/center`)
            let centerData = await center.json()
            setViewport({
                latitude: centerData[0],
                longitude: centerData[1],
                zoom: 14.5,
                bearing: 0,
                pitch: 0
            })
        }
        // console.log("AT FETCH", spinArea)
        trackPromise(fetchMapData(), spinArea)
    }, [selectedHA]);

    return (
        <div className="map__map_and_selector container">
            <div className="map__map">
                <Map allData={data} viewport={viewport} setViewport={setViewport} />
            </div>
            <div className="map__health_area_selector">
                <HealthAreaSelector healthAreas={healthAreas} setSelectedHA={setSelectedHA} spinAreaObj={spinAreaObj} />
            </div>
        </div>
    )
}

export default MapPage
