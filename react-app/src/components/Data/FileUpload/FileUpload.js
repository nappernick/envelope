import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { DropzoneArea } from 'material-ui-dropzone'
import Modal from "react-modal"
import axios from "axios"
import { addDataSet } from "../../../store/data_sets"
import FileUploadModal from './FileUploadModal'
import { useDebounce } from 'use-debounce';
import Spinner from '../../Loaders/Spinner'
import { areas } from '../../../common/areas'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import "./FileUpload.css"
import { useHistory } from 'react-router-dom'

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
        border: 'none',
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px"
    },
    overlay: { zIndex: 1000 }
};

function FileUpload() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [disabled, setDisabled] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('')
    const [origFileName, setOrigFileName] = useState([])
    const [key, setKey] = useState(0);
    const [debounceKey] = useDebounce(key, 1000);
    const { promiseInProgress } = usePromiseTracker({
        area: "upload-data-set",
        delay: 0,
    });


    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const handleFile = (files) => setFile(files[0])

    const onFileUpload = async (e) => {
        e.preventDefault()
        const fileUpload = async () => {
            const fileExt = origFileName.length > 2 ? origFileName.slice(1).join(".") : origFileName[1]
            let new_file_name = `${fileName}.${fileExt}`
            const formData = new FormData();
            formData.append(
                "myFile",
                file,
                new_file_name
            );
            let dsJSON = await axios.post("/api/data/upload", formData);
            let dataSet = dsJSON.data
            dispatch(addDataSet(dataSet))
            setKey(null)
        }
        trackPromise(fileUpload(), areas.uploadDS)
        return history.push("/data-sets")
    }

    const file_tools = {
        "file": file,
        "fileName": fileName,
        "onFileUpload": onFileUpload,
        "closeModal": closeModal,
        "setFileName": setFileName
    }

    useEffect(() => {
        if (file) setOrigFileName(file.name.split("."))
        if (file) setDisabled(false)
        if (!file) setDisabled(true)
    }, [file])

    return (
        <div className="file_upload__container">
            {promiseInProgress ? <div className="data_set__spinnner">
                <Spinner
                    areas={areas.uploadDS}
                />
            </div>
                :
                <div className="drop_zone__container">
                    <div className="file_upload__dropzone">
                        <DropzoneArea
                            key={debounceKey}
                            showFileNames
                            dropzoneText="Click Here Or Drag & Drop .csv, .csv.zip, or .dta"
                            filesLimit={1}
                            maxFileSize={500000000}
                            onChange={values => handleFile(values)}
                            acceptedFiles={[".zip", "text/csv", ".dta"]}
                        />
                    </div>
                    <div className="file_upload__button">
                        <button onClick={openModal} disabled={disabled}>
                            Confirm & Upload
                    </button>
                    </div>
                </div>
            }
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={300}
                contentLabel="Data Set Upload Modal"
            >
                <div className="file_upload__modal">
                    <FileUploadModal file_tools={file_tools} origFileName={origFileName} />
                </div>
            </Modal>
        </div>
    )
}

export default FileUpload
