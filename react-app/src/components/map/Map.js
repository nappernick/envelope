import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { range } from 'd3-array';
import { scaleQuantile } from 'd3-scale';
import { setRTLTextPlugin } from 'react-map-gl';
import MapGL, { Source, Layer } from 'react-map-gl';


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

// 

function Map() {
    const [viewport, setViewport] = useState({});
    const [allData, setAllData] = useState(null);

    


    useEffect(() => {
        const fetchMapData = async () => {
            let surveys = await fetch("/api/data/1/health-areas/1/map")
            let surveysData = await surveys.json()
            setAllData(surveysData)

            let center = await fetch("/api/data/1/health-areas/1/center")
            let centerData = await center.json()
            setViewport({
                latitude: centerData[0],
                longitude: centerData[1],
                zoom: 9,
                bearing: 0,
                pitch: 0
            })
        }
        fetchMapData()
    }, []);

    console.log(allData)

    return (
        <MapGL
            {...viewport}
            width="50vw"
            height="50vw"
            mapStyle="mapbox://styles/mapbox/light-v9"
            onViewportChange={setViewport}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            interactiveLayerIds={['data']}
        // onHover={onHover}
        >
            {/* <Source id="points" type="geojson" data={allData} /> */}
        </MapGL>
    );
}

export default Map
