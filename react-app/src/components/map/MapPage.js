import React, { useState, useCallback, useEffect, useMemo } from 'react'
import Map from './Map'

function MapPage() {
    const [viewport, setViewport] = useState({
        latitude: 6.30953127139638,
        longitude: 14.808780033196266,
        zoom: 2.8,
        bearing: 0,
        pitch: 0
    });
    const [allData, setAllData] = useState(null);

    useEffect(() => {
        const fetchMapData = async () => {
            let surveys = await fetch("/api/data/projects/1/health-areas/1/map")
            let surveysData = await surveys.json()
            setAllData(surveysData)

            let center = await fetch("/api/data/projects/1/health-areas/1/center")
            let centerData = await center.json()
            setViewport({
                latitude: centerData[0],
                longitude: centerData[1],
                zoom: 15.5,
                bearing: 0,
                pitch: 0
            })
        }
        fetchMapData()
    }, []);

    return (
        <div className="map__map_and_selector">
            <div className="map__health_area_selector">

            </div>
            <div className="map__map">
                <Map allData={allData} viewport={viewport} setViewport={setViewport} />
            </div>
        </div>
    )
}

export default MapPage
