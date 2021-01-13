import React, { useEffect, useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import Modal from "react-modal"
import axios from "axios"
import FileUploadModal from './FileUploadModal'

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

function FileUpload() {
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('')
    const [origFileName, setOrigFileName] = useState([])


    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const handleFile = (files) => setFile(files[0])

    const onFileUpload = async (e) => {
        e.preventDefault()
        const fileExt = origFileName.length > 2 ? origFileName.slice(1).join(".") : origFileName[1]
        let new_file_name = `${fileName}.${fileExt}`
        const formData = new FormData();
        formData.append(
            "myFile",
            file,
            new_file_name
        );
        axios.post("/api/data/upload", formData);
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
    }, [file])

    return (
        <div className="file_upload__container">
            <div className="file_upload__dropzone">
                <DropzoneArea
                    maxFileSize={500000000}
                    onChange={values => handleFile(values)}
                    acceptedFiles={[".zip", "text/csv", ".dta"]}
                />
            </div>
            <div className="file_upload__button">
                <button onClick={openModal} disabled={file ? false : true}>
                    Confirm & Upload
            </button>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
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
