import React, { useState } from 'react'
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

function FileUpload() {
    const [open, setOpen] = useState(true);
    const [file, setFile] = useState(null)

    return (
        <div>
            <DropzoneArea
                onChange={(files) => console.log('Files:', files)}
            />
        </div>
    )
}

export default FileUpload
