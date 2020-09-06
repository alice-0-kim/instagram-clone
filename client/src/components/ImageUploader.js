import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Collapse,
    IconButton,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import { getUser } from '../actions'

export default connect(null, { getUser })(({ open, handleClose, getUser }) => {
    const Input = useRef(null)
    const Image = useRef(null)
    const [show, showAlert] = useState(false)
    const [message, setMessage] = useState('')

    const handleImageUpload = async () => {
        const formData = new FormData()
        formData.append('myImage', Image.current.file)
        const res = await axios.post('/image', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
        if (!res.data.success) {
            setMessage(res.data.message)
            showAlert(true)
        } else {
            await getUser(true)
            handleClose(true)
        }
    }

    const handleImageSelect = e => {
        const [file] = e.target.files
        if (file) {
            const reader = new FileReader()
            const { current } = Image
            current.file = file
            reader.onload = e => {
                current.src = e.target.result
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" disableTypography style={{ fontWeight: 500 }}>Upload image</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ fontSize: 14 }}>
                    To upload a new image, click on the box below to select a file.
                </DialogContentText>
                <Collapse in={show}>
                    <Alert
                        severity="error"
                        action={(
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    showAlert(false)
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        )}
                    >
                        {`You violated ${message}!`}
                    </Alert>
                </Collapse>
                <input ref={Input} type="file" accept="image/*" onChange={handleImageSelect} hidden />
                <img
                    ref={Image}
                    style={{
                        display: 'block', margin: '5rem auto', width: 150, height: 150, objectFit: 'cover',
                    }}
                    onClick={() => Input.current.click()}
                />
            </DialogContent>
            <DialogActions style={{ padding: '1rem' }}>
                <Button onClick={() => handleClose(false)} color="primary" style={{ textTransform: 'capitalize' }}>Cancel</Button>
                <Button onClick={handleImageUpload} color="primary" variant="contained" style={{ color: '#fff', textTransform: 'capitalize' }}>Upload</Button>
            </DialogActions>
        </Dialog>
    )
})
