import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./FileUploadModal.css"

function FileUploadModal({ file_tools, origFileName }) {
    const { file, fileName, onFileUpload, setFileName } = file_tools
    const dataSets = useSelector(store => store.dataSets)
    const [disabled, setDisabled] = useState(true)
    // Local state for checking duplicate data set names
    const [dataSetNames, setDataSetNames] = useState([])
    const [dupeName, setDupeName] = useState(false)


    const updateFileName = (e) => {
        setDisabled(false)
        setFileName(e.target.value)
    }

    const handleUpload = (e) => {
        e.preventDefault()
        onFileUpload(e)
    }

    useEffect(() => {
        if (dataSets) {
            const dataSetNames = []
            dataSets.forEach(dataSet => {
                dataSetNames.push(dataSet.data_set_name.split(".")[0])
            })
            setDataSetNames(dataSetNames)
        }
    }, [dataSets]);

    useEffect(() => {
        // logic to jiggle button if name is duplicate & disable if there is 
        // no file name provided
        if (!fileName) setDisabled(true)
        if (dataSetNames.indexOf(fileName) > -1) {
            debugger
            setDupeName(true)
            setDisabled(true)
        }
        else {
            setDupeName(false)
            setDisabled(false)
        }
    }, [fileName, dataSetNames])

    useEffect(() => {
        setFileName(origFileName[0])
    }, [origFileName, setFileName])

    return (
        <div className="upload_modal__container">
            <div className="upload_modal__file_name header">
                {fileName ? fileName : file.name.split(".")[0]}
            </div>
            <div className="upload_modal__update_name container">
                <div className="upload_modal__update_name title">
                    Update File Name
                </div>
                <div className="upload_modal__update_name input">
                    <input
                        type="text"
                        placeholder="Leave blank for same title..."
                        onChange={updateFileName}
                    />
                </div>
            </div>
            <div className="upload_modal__file_size container">
                <div className="upload_modal__file_size title">
                    Upload Size
                </div>
                <div className="upload_modal__file_size display">
                    {(file.size / 1000000).toFixed(2)} MB
                </div>
            </div>
            <div className="upload_modal__file_background container">
                <div className="upload_modal__file_background">
                    File Will Upload In The Background
                </div>
            </div>
            <div className="upload_modal__upload button">
                <button
                    onClick={handleUpload}
                    disabled={disabled}
                    className={dupeName ? "dupe" : ""}
                >Confirm & Upload</button>
            </div>
        </div>
    )
}

export default FileUploadModal
