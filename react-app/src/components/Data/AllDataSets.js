import React from 'react'
import { useSelector } from 'react-redux'
import Modal from "react-modal"
import { Redirect, useHistory } from 'react-router-dom';

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '40%',
        left: '70%',
        right: '40%',
        bottom: 'auto',
        height: "45%",
        marginRight: '-50%',
        paddingTop: "0px",
        transform: 'translate(-100%, -50%)',
        border: '1px solid lightgrey',
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        justifyContent: "center",
    }
};

function AllDataSets() {
    const history = useHistory()
    const dataSets = useSelector(store => store.dataSets)

    const handleClick = () => history.push("/data-sets/upload")

    return (
        <>
            <table className="data_sets__table">
                <thead className="data_set__titles">
                    <tr className="data_set__data_set row">
                        <th className="data_set__data_set header">
                            Data Set Name
                </th>
                        <th className="data_set__data_set header">
                            Created At
                </th>
                        <th className="data_set__data_set header">
                            Updated At
                </th>
                    </tr>
                </thead>
                <tbody className="data_set__rows">
                    {dataSets.length && dataSets.map(dataSet => {
                        return (
                            <tr className="data_set__data_set row">
                                <td className="data_set__data_set data">
                                    {dataSet.data_set_name}
                                </td>
                                <td className="data_set__data_set data">
                                    {dataSet.created_at}
                                </td>
                                <td className="data_set__data_set data">
                                    {dataSet.updated_at}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="data_set__upload_button">
                <div className="data_set__upload_button button" onClick={handleClick} >
                    Upload Data Set
                </div>
            </div>
        </>
    )
}

export default AllDataSets
