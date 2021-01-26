import React, { useEffect, useState } from 'react'
import Switch from "react-switch";

function SingleDataSet({ dataSetObj }) {
    const { dataSet, setSelectedDataSetId, index, setSelected, selected, projectDataSetId } = dataSetObj
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

    useEffect(() => {
        if (!dataSet) return
        if (dataSet.id === projectDataSetId) {
            setSwitched(true)
            setSelected(index)
            const id = dataSet.id
            setSelectedDataSetId(id)
        }
    }, [dataSet, index, projectDataSetId, setSelected, setSelectedDataSetId])

    return (
        <>
            <tr className="projects_modal__user_list row">
                <td className="projects_modal__user_list row">
                    {dataSet.data_set_name}
                </td>
                <td className="projects_modal__user_list row">
                    {dataSet.created_at}
                </td>
                <td className="projects_modal__user_list switch row">
                    <Switch
                        onChange={handleSwitch}
                        checked={switched}
                        disabled={selected === index || selected === null ? false : true}
                        onColor="#83c2c1"
                        offColor="#dcac63"
                        height={20}
                        width={50}
                    />
                    {/* <input type="checkbox" /> */}
                </td>
            </tr>
        </>
    )
}

export default SingleDataSet
