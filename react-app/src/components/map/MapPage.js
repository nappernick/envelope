import React, { useState, useEffect, useMemo } from 'react'
import HealthAreaSelector from './HealthAreaSelector';
import Map from './Map'

function MapPage() {
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

    useEffect(() => {
        const fetchHealthArea = async () => {
            let has = await (fetch("/api/data/1/projects/1/health-areas"))
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
                zoom: 15.3,
                bearing: 0,
                pitch: 0
            })
        }
        fetchMapData()
    }, [selectedHA]);

    return (
        <div className="map__map_and_selector">
            <div className="map__map">
                <Map allData={data} viewport={viewport} setViewport={setViewport} />
            </div>
            <div className="map__health_area_selector">
                <HealthAreaSelector healthAreas={healthAreas} setSelectedHA={setSelectedHA} />
            </div>
        </div>
    )
}

export default MapPage
