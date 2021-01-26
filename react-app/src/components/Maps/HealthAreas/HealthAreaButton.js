import React from 'react'

function HealthAreaButton({ healthArea, ha_obj, index }) {
    const { setSelectedHA, selectedHA } = ha_obj
    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setSelectedHA(healthArea.id)
    }

    return (
        <>
            <div className="health_areas__button container">
                <button
                    onClick={handleClick}
                    className={`health_areas__button ${healthArea.id === selectedHA ? "mod" : ""}`}
                >
                    {healthArea.name}
                </button>
            </div>
        </>
    )
}

export default HealthAreaButton
