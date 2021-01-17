import React from 'react'
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import HealthAreaButton from './HealthAreaButton';
import "./HealthAreas.css"


function HealthAreaSelector({ healthAreas, setSelectedHA, selectedHA }) {
    const ha_obj = {
        "setSelectedHA": setSelectedHA,
        "selectedHA": selectedHA
    }

    const Row = ({ data, index, style }) => (
        <div key={`m_${index}`}
            className="health-area__btncontainer"
            style={style}>
            <HealthAreaButton
                healthArea={healthAreas[index]}
                ha_obj={ha_obj}
                index={index}
            />
        </div>
    );


    return (
        <div className="health_areas__autosizer container">
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        className="health_areas__container"
                        height={height}
                        itemSize={50}
                        width={width}
                        itemCount={healthAreas.length}
                        itemData={setSelectedHA}
                    >
                        {healthAreas.length && Row}

                    </List>
                )}
            </AutoSizer>
        </div>
    )
}

export default HealthAreaSelector
