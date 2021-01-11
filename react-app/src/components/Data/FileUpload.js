import React, { useState } from 'react'
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import axios from "axios"

function FileUpload() {
    const [open, setOpen] = useState(true);
    const [file, setFile] = useState(null)

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const onFileUpload = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append(
            "myFile",
            file,
            file.name
        );
        axios.post("/api/data/upload", formData);
    }

    return (
        <div>
            <input type="file" onChange={handleFile} />
            <button onClick={onFileUpload}>
                Upload!
                </button>
        </div>
    )
}

export default FileUpload
