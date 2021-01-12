import React, { useEffect, useState } from 'react'

function FileUploadModal({ file_tools, origFileName }) {
    const { file, fileName, onFileUpload, setFileName, closeModal } = file_tools


    const updateFileName = (e) => setFileName(e.target.value)

    const handleUpload = (e) => {
        e.preventDefault()
        onFileUpload(e)
        closeModal()
    }

    useEffect(() => {
        setFileName(origFileName[0])
    }, [])

    return (
        <div className="upload_modal__container">
            <div className="upload_modal__file_name header">
                {fileName ? fileName : file.name.split(".")[0]}
            </div>
            <div className="upload_modal__update_name">
                <div className="upload_modal__update_name title">
                    Update File Name:
                </div>
                <div className="upload_modal__update_name input">
                    <input
                        type="text"
                        onChange={updateFileName}
                    />
                </div>
            </div>
            <div className="upload_modal__file_size">
                <div className="upload_modal__file_size title">
                    Upload Size:
                </div>
                <div className="upload_modal__file_size display">
                    {(file.size / 1000000).toFixed(2)} MB
                </div>
            </div>
            <div className="upload_modal__upload button">
                <button onClick={handleUpload}>Confirm & Upload</button>
            </div>
        </div>
    )
}

export default FileUploadModal
