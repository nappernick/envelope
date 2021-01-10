import * as React from 'react';
import { Marker } from 'react-map-gl';

const ICON = `M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625`;

const SIZE = 20;

function Pins({ data }) {
    if (data) console.log(data["features"][0].geometry.coordinates[0])
    return (
        <>
            {data && data["features"].map((survey, index) => (
                <Marker key={`marker-${index}`} latitude={survey.geometry.coordinates[0]} longitude={survey.geometry.coordinates[1]}>
                    <svg
                        height="20px"
                        viewBox="0 0 24 24"
                        style={{
                            cursor: 'pointer',
                            fill: '#d00',
                            stroke: 'none',
                            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                        }}
                    // onClick={() => onClick(data)}
                    >
                        <path d={ICON} />
                    </svg>
                </Marker>
            )
            )
            }
        </>
    )
}

export default React.memo(Pins)
