import React, { useState } from 'react'
import { setRTLTextPlugin } from 'react-map-gl';
import MapGL, { Source, Layer } from 'react-map-gl';


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

function Map() {
    const [viewport, setViewport] = useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
        bearing: 0,
        pitch: 0
    });



    return (
        <MapGL
            {...viewport}
            width="50vw"
            height="50vh"
            mapStyle="mapbox://styles/mapbox/dark-v9"
            onViewportChange={setViewport}
            mapboxApiAccessToken={MAPBOX_TOKEN}
        >
            <Source
        </MapGL>
    );
}

export default Map
