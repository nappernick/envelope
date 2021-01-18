import React, { useEffect, useState } from 'react';
import { Marker } from 'react-map-gl';

const ICON = `M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625`;

const SIZE = 20;

function Pins({ data, onClick }) {
    const [enumerators, setEnumerators] = useState([])
    const colors = ["#bada55", "#7fe5f0", "#ff0000", "#ff80ed", "#407294", "#cbcba9", "#420420", "#133337", "#065535", "#c0c0c0", "#ffa500", "#660066", "#696969", "#bada55", "#7fe5f0", "#ff0000", "#ff80ed", "#407294", "#cbcba9", "#420420", "#133337", "#065535", "#c0c0c0", "#ffa500", "#660066"]

    useEffect(() => {
        const setEnums = () => {
            const enums = []
            data["features"].forEach((survey) => {
                const enumId = survey.properties.enumerator_id
                if (!enums.includes(enumId)) enums.push(enumId)
            })
            setEnumerators(enums)
        }
        if (data && data["features"].length) {
            setEnums()
        }

    }, [data])

    return (
        <>
            {data && data["features"].map((survey, index) => {
                const enumColor = colors[enumerators.indexOf(survey.properties.enumerator_id)]
                const surveyObj = {
                    "latitude": survey.geometry.coordinates[0],
                    "longtitude": survey.geometry.coordinates[1],
                    "administered": survey.properties.date_time_administered,
                    "duration": survey.properties.duration,
                    "enumerator": survey.properties.enumerator_id,
                    "dont_knows": survey.properties.num_dont_know_responses,
                    "outliers": survey.properties.num_outlier_data_points,
                    "respondent": survey.properties.respondent
                }
                return (<Marker key={`marker-${index}`} latitude={survey.geometry.coordinates[0]} longitude={survey.geometry.coordinates[1]}>
                    <svg
                        height="20px"
                        viewBox="0 0 24 24"
                        style={{
                            cursor: 'pointer',
                            fill: enumColor,
                            stroke: 'none',
                            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                        }}
                        onClick={() => onClick(surveyObj)}
                    >
                        <path d={ICON} />
                    </svg>
                </Marker>
                )
            }
            )
            }
        </>
    )
}

export default React.memo(Pins)
