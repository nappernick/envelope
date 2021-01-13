import React, { useState } from 'react'
import Switch from "react-switch";

function SingleDataSet({ dataSetObj }) {
    const { dataSet, setSelectedDataSetId, index, setSelected, selected } = dataSetObj
    const [switched, setSwitched] = useState(false)

    const handleSwitch = () => {
        setSwitched(!switched)
        if (switched) {
            setSelected(null)
            setSelectedDataSetId(null)
        }
        else {
            setSelected(index)
            const id = dataSet.id
            setSelectedDataSetId(id)
        }
    }

    return (
        <>
            <tr className="projects_modal__user_list row">
                <td className="projects_modal__user_list row">
                    {dataSet.data_set_name}
                </td>
                <td className="projects_modal__user_list row">
                    {dataSet.created_at}
                </td>
                <td className="projects_modal__user_list row">
                    <Switch onChange={handleSwitch} checked={switched}
                        disabled={selected == index || selected == null ? false : true} />
                    {/* <input type="checkbox" /> */}
                </td>
            </tr>
        </>
    )
}

export default SingleDataSet
