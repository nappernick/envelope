import React, { useState } from 'react'
import SingleDataSet from './SingleDataSet'

function DataSetsListForm({ dataSetsObj }) {
    const { dataSets, setSelectedDataSetId, projectDataSetId } = dataSetsObj
    const [selected, setSelected] = useState(null)

    return (
        <>
            <table className="projects_modal__user_list list">
                <thead>
                    <tr className="projects_modal__user_list header">
                        <th className="projects_modal__user_list header">
                            Data Set name</th>
                        <th className="projects_modal__user_list header">
                            Created At</th>
                        <th className="projects_modal__user_list header switch">
                            Add to Project</th>
                    </tr>
                </thead>
                <tbody>
                    {dataSets.map((dataSet, index) => {
                        const dataSetObj = {
                            "dataSet": dataSet,
                            "setSelectedDataSetId": setSelectedDataSetId,
                            "index": index,
                            "setSelected": setSelected,
                            "selected": selected,
                            projectDataSetId
                        }
                        return (<SingleDataSet
                            key={index}
                            dataSetObj={dataSetObj}
                            className={`data-set-${index}`}
                        />)
                    })}
                </tbody>
            </table>
        </ >
    )
}

export default DataSetsListForm
