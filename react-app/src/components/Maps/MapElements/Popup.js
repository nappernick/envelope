import React from 'react'
import { Popup } from "react-map-gl"
import PopupInfo from './PopupInfo'

function PopUp({ popUpInfo, setPopUpInfo }) {
    return (
        <Popup
            tipSize={5}
            anchor="top"
            closeOnClick={false}
            onClose={() => setPopUpInfo(null)}
        >
            <PopupInfo popUpInfo={popUpInfo} />
        </Popup>
    )
}

export default PopUp
