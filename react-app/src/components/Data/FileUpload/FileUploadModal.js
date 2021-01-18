import React, { useEffect, useState } from 'react'
import "./FileUploadModal.css"

function FileUploadModal({ file_tools, origFileName }) {
    const { file, fileName, onFileUpload, setFileName, closeModal } = file_tools
    const [disabled, setDisabled] = useState(true)


    const updateFileName = (e) => {
        setDisabled(false)
        setFileName(e.target.value)
    }

    const handleUpload = (e) => {
        e.preventDefault()
        onFileUpload(e)
        closeModal()
    }


    useEffect(() => {
        if (!fileName) setDisabled(true)
    }, [fileName])

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
                        placeholder="New file name here..."
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
            <div className="upload_modal__upload button">
                <button
                    onClick={handleUpload}
                    disabled={disabled}
                >Confirm & Upload</button>
            </div>
        </div>
    )
}

export default FileUploadModal
