import React from 'react'

function DataSetsListForm({ dataSets }) {
    return (
        <>
            <table className="projects_modal__user_list">
                <thead>
                    <tr className="projects_modal__user_list header">
                        <th className="projects_modal__user_list header">
                            Data Set name</th>
                        <th className="projects_modal__user_list header">
                            Created At</th>
                        <th className="projects_modal__user_list header">
                            Add to Project</th>
                    </tr>
                </thead>
                <tbody>
                    {dataSets.map((dataSet) => <SingleUserForm dataSet={dataSet} setSelectedDataSetId={setSelectedDataSetId} />)}
                </tbody>
            </table>
        </ >
    )
}

export default DataSetsListForm
