import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import Modal from "react-modal"
import { useHistory } from 'react-router-dom';
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeBounce } from "better-react-spinkit"
import { trackPromise } from 'react-promise-tracker';
import _ from "lodash"
import Spinner from '../Loaders/Spinner';
import UpdateDataSetModal from './UpdateDataSetModal/UpdateDataSetModal';
import { addDataSet } from "../../store/data_sets"
import { removeDataSet } from "../../store/data_sets"
import { areas } from "../../common/areas";
import { configDate, useInterval } from "../utils"
import { addProject, removeProject } from '../../store/projects';
import "./AllDataSets.css"

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '40%',
        left: 'auto',
        right: '35%',
        bottom: 'auto',
        height: "33%",
        marginRight: '-50%',
        paddingTop: "0px",
        transform: 'translate(-100%, -50%)',
        border: 'none',
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        justifyContent: "center",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px"
    }
};

function AllDataSets() {
    const history = useHistory()
    const dispatch = useDispatch()
    const dataSets = useSelector(store => store.dataSets)
    const projects = useSelector(store => store.projects)
    const [dataSet, setDataSet] = useState({})
    const [showModal, setShowModal] = useState(false);
    const { promiseInProgress } = usePromiseTracker({
        area: "delete-data-set",
        delay: 0,
    });

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
            if (!res.errors) dispatch(removeDataSet(id))
        }
        trackPromise(deleteFetch(), areas.deleteDS)
        // Removing all associated projects from the store
        projects.forEach(project => {
            if (project.data_set_id === id) {
                dispatch(removeProject(project.id))
                fetch(`/api/projects/${project.id}`, { method: "DELETE" })
            }
        })
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
            // If the fetch was successful, dispatch a new dataset to store
            if (Object.keys(ds).length) dispatch(addDataSet(ds))
            // Update all the references to the dataset on projects
            projects.forEach((project) => {
                if (project.data_set_id === dataSet.id) {
                    project.data_set = ds
                    dispatch(addProject(project))
                }
            })
        }
        postFetch()
    }

    // Setting up & running polling
    useInterval(async () => {
        if (promiseInProgress) return
        console.log("Running check for data sets...")
        let dataSetsFetch = await fetch("/api/data/data-sets")
        if (dataSetsFetch.status === 200) dataSetsFetch = await dataSetsFetch.json()
        if (!dataSetsFetch.length) return
        if (_.isEqual(dataSetsFetch, dataSets)) return
        else {
            dataSetsFetch.forEach(ds => {
                let found = false
                for (let i = 0; i < dataSets.length; i++) {
                    if (dataSets[i].data_set_name === ds.data_set_name) return found = true
                }
                if (!found) dispatch(addDataSet(ds))
            })
        }
    }, 30000)

    return (
        <div className="data_sets__container" >
            {dataSets.length ? <div className="data_sets__wrapper">
                <div className="data_sets__header">
                    <p>ALL DATA SETS</p>
                </div>
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
                            <th className="data_set__data_set header button">
                                Update Name
                            </th>
                            <th className="data_set__data_set header button">
                                Delete Data Set
                            </th>
                        </tr>
                    </thead>
                    <tbody className="data_set__rows">
                        {dataSets.map(dataSet => {
                            return (
                                <tr key={dataSet.id} className="data_set__data_set row">
                                    <td className="data_set__data_set data">
                                        {dataSet.data_set_name}
                                    </td>
                                    <td className="data_set__data_set data">
                                        {configDate(dataSet.created_at)}
                                    </td>
                                    <td className="data_set__data_set data">
                                        {configDate(dataSet.updated_at)}
                                    </td>
                                    <td className="data_set__data_set data button">
                                        <div className="data_set__data_set data button" >
                                            <button className="data_set__data_set button" onClick={(e) => openModal(e, dataSet)} >Update</button>
                                        </div>
                                    </td>
                                    <td className="data_set__data_set data button">
                                        {promiseInProgress ?
                                            <div className="spinner">
                                                <ThreeBounce
                                                    size={15}
                                                    color="#e98641"
                                                    duration=".7s"
                                                />
                                            </div> :
                                            <div className="data_set__data_set data button" >
                                                <button className="data_set__data_set delete"
                                                    onClick={(e) => handleDelete(e, dataSet.id)}
                                                >Delete</button>
                                            </div>}
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
                :
                <div className="data_set__spinnner">
                    <Spinner
                        areas={areas.dataSetList}
                    />
                </div>
            }
            <div className="data_set__upload_button">
                <button className="data_set__upload_button button" onClick={handleUploadClick} >
                    Upload Data Set
                </button>
            </div>
            <div className="data_set__update modal">
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    closeTimeoutMS={300}
                    contentLabel="Update Data Set Modal"
                >
                    <UpdateDataSetModal dataSet={dataSet} setDataSet={setDataSet} handleUpdateClick={handleUpdateClick} />
                </Modal>
            </div>
        </div>
    )
}

export default AllDataSets
