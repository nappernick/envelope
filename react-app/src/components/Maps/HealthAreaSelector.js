import React from 'react'
import { FixedSizeList as List } from 'react-window';
import HealthAreaButton from './HealthAreaButton';


function HealthAreaSelector({ healthAreas, setSelectedHA }) {

    const Row = ({ data, index, style }) => (
        <div key={`m_${index}`}
            className="health-area__btncontainer"
            style={style}>
            <HealthAreaButton
                healthArea={healthAreas[index]}
                setSelectedHA={data} />
        </div>
    );

    return (
        <>
            <List
                className="health_areas__container"
                height={500}
                itemSize={50}
                width={500}
                itemCount={healthAreas.length}
                itemData={setSelectedHA}
            >
                {healthAreas.length && Row}

            </List>
        </>
    )
}

export default HealthAreaSelector
