import React, { useState } from 'react'
import MapGL, {
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import Pins from "./MapElements/Pins"
import PopUp from "./MapElements/Popup"
import AutoSizer from "react-virtualized-auto-sizer";


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

const fullscreenControlStyle = {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'
};

const navStyle = {
    position: 'absolute',
    top: 72,
    left: 0,
    padding: '10px'
};

const scaleControlStyle = {
    position: 'absolute',
    bottom: 36,
    left: 0,
    padding: '10px'
};

function Map({ viewport, allData, setViewport }) {
    const [popUpInfo, setPopUpInfo] = useState(null)

    const handleMarkerClick = (info) => setPopUpInfo(info)

    return (
        <div className="map__autosizer container">
            <AutoSizer>
                {({ height, width }) => (
                    <MapGL
                        {...viewport}
                        width={width}
                        height={height}
                        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
                        onViewportChange={setViewport}
                        mapboxApiAccessToken={MAPBOX_TOKEN}

                    // onHover={onHover}
                    >
                        <Pins data={allData} onClick={handleMarkerClick} />

                        {popUpInfo && <PopUp popUpInfo={popUpInfo} setPopUpInfo={setPopUpInfo} />}

                        <div style={geolocateStyle}>
                            <GeolocateControl />
                        </div>
                        <div style={fullscreenControlStyle}>
                            <FullscreenControl />
                        </div>
                        <div style={navStyle}>
                            <NavigationControl />
                        </div>
                        <div style={scaleControlStyle}>
                            <ScaleControl />
                        </div>
                    </MapGL>
                )}
            </AutoSizer>
        </div>
    );
}

export default Map
