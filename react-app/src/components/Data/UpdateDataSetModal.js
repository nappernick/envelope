import React, { useState } from 'react'

function UpdateDataSetModal({ dataSet, setDataSet, handleUpdateClick }) {
    const { data_set_name } = dataSet
    const dsNameArr = data_set_name.split('.')
    const fileExt = dsNameArr.length > 2 ? dsNameArr.slice(1).join(".") : dsNameArr[1]

    const [fileName, setFileName] = useState(dsNameArr[0])

    const handleChange = (e) => {
        setFileName(e.target.value)
        let dsCopy = { ...dataSet }
        dsCopy.data_set_name = `${e.target.value}.${fileExt}`
        setDataSet(dsCopy)
    }

    const handleSubmit = (e) => handleUpdateClick(e, dataSet)

    return (
        <>
            <div className="data_set__modal container">
                <div className="data_set__modal header">
                    Update Data Set Name
            </div>
                <div className="data_set__modal body">
                    <div className="data_set__modal input">
                        <input
                            type="text"
                            className="data_set__modal"
                            onChange={handleChange}
                            value={fileName}
                        />
                    </div>
                </div>
                <div className="data_set__modal submit">
                    <button onClick={handleSubmit} >Submit</button>
                </div>
            </div>
        </>
    )
}

export default UpdateDataSetModal
