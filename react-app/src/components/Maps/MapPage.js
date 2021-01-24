import React, { useState, useEffect, useMemo } from 'react'
import { trackPromise } from "react-promise-tracker";
import { useParams } from 'react-router-dom';
import { areas } from "../../common/areas";
import HealthAreaSelector from './HealthAreas/HealthAreaSelector';
import Map from './Map'
import "./MapPage.css"
import { calculateZoom } from './MapUtils';

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
    const [haSurveyCount, setHaSurveyCount] = useState(0)
    const [spinArea, setSpinArea] = useState(areas.mapButtons)

    useEffect(() => {
        const fetchHealthArea = async () => {
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
            setHaSurveyCount(surveysData["count_surveys"])

            let center = await fetch(`/api/data/projects/1/health-areas/${selectedHA}/center`)
            let centerData = await center.json()
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
        if (healthAreas.length) trackPromise(fetchMapData(), spinArea)
    }, [selectedHA]);

    return (
        <div className="map__map_and_selector container">
            <div className="map__map">
                <div className="map__selected_ha_survey_count container">
                    <div className="map__selected_ha_survey_count header">
                        {selectedHA ?
                            `Health Area Coverage ${Math.round(haSurveyCount / 24 * 100)}%`
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
