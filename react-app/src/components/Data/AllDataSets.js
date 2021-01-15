import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from "react-modal"
import { Redirect, useHistory } from 'react-router-dom';
import UpdateDataSetModal from './UpdateDataSetModal';
import { addDataSet } from "../../store/data_sets"
import { removeDataSet } from "../../store/data_sets"
import { trackPromise } from 'react-promise-tracker';
import { areas } from "../../common/areas";
import { usePromiseTracker } from "react-promise-tracker";
import { DoubleBounce } from "better-react-spinkit"

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '40%',
        left: '65%',
        right: '55%',
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
    const dispatch = useDispatch()
    const dataSets = useSelector(store => store.dataSets)
    const [dataSet, setDataSet] = useState({})
    const [showModal, setShowModal] = useState(false);
    const { promiseInProgress } = usePromiseTracker({
        area: "delete-data-set",
        delay: 0,
    });

    console.log("PROMISE IN PROGRESS:", promiseInProgress)

    const openModal = (e, dataSet) => {
        e.preventDefault()
        setShowModal(true)
        setDataSet(dataSet)
    }
    const closeModal = () => setShowModal(false)

    const handleUploadClick = () => history.push("/data-sets/upload")
    const handleDelete = (e, id) => {
        e.preventDefault()
        const deleteFetch = async () => {
            let post = await fetch(`/api/data/${id}`, {
                method: "DELETE"
            })
            const res = await post.json()
            dispatch(removeDataSet(id))
        }
        trackPromise(deleteFetch(), areas.deleteDS)
    }
    const handleUpdateClick = (e, dataSet) => {
        e.preventDefault()
        closeModal()
        const postFetch = async () => {
            let post = await fetch(`/api/data/${dataSet.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...dataSet })
            })
            const ds = await post.json()
            // console.log(ds)
            if (Object.keys(ds).length) dispatch(addDataSet(ds))
        }
        postFetch()
    }

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
                        <th className="data_set__data_set header">
                            Update Name
                </th>
                        <th className="data_set__data_set header">
                            Delete Data Set
                </th>
                    </tr>
                </thead>
                <tbody className="data_set__rows">
                    {dataSets.length && dataSets.map(dataSet => {
                        return (
                            <tr key={dataSet.id} className="data_set__data_set row">
                                <td className="data_set__data_set data">
                                    {dataSet.data_set_name}
                                </td>
                                <td className="data_set__data_set data">
                                    {dataSet.created_at}
                                </td>
                                <td className="data_set__data_set data">
                                    {dataSet.updated_at}
                                </td>
                                <td className="data_set__data_set data">
                                    <button className="data_set__data_set button" onClick={(e) => openModal(e, dataSet)} >Update</button>
                                </td>
                                <td className="data_set__data_set data">
                                    {promiseInProgress ? <div className="spinner">
                                        <DoubleBounce size={5} />
                                    </div> :
                                        <button className="data_set__data_set delete"
                                            onClick={(e) => handleDelete(e, dataSet.id)}
                                        >Delete</button>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="data_set__upload_button">
                <div className="data_set__upload_button button" onClick={handleUploadClick} >
                    Upload Data Set
                </div>
            </div>
            <div className="data_set__update modal">
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Update Data Set Modal"
                >
                    <UpdateDataSetModal dataSet={dataSet} setDataSet={setDataSet} handleUpdateClick={handleUpdateClick} />
                </Modal>
            </div>
        </>
    )
}

export default AllDataSets
