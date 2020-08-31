import React, { useState, useRef } from 'react'
import { Collapse, Fab, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import Navbar from './Navbar'

const Layout = ({ children }) => {
    const Input = useRef(null)
    const Image = useRef(null)
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState('success')

    const handleImageUpload = async () => {
        const formData = new FormData()
        formData.append('myImage', Image.current.file)
        const res = await axios.post('/image', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
        setSeverity(res.data.success ? 'success' : 'error')
        setMessage(res.data.success ? 'Image was successfully posted!' : `You violated ${res.data.message}!`)
        setOpen(true)
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
            handleImageUpload()
        }
    }
    return (
        <>
            <Navbar />
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 528,
                    padding: `0 1.0875rem 1.45rem`,
                }}
            >
                <main>
                    <Collapse in={open}>
                        <Alert
                            severity={severity}
                            action={(
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            )}
                        >
                            {message}
                        </Alert>
                    </Collapse>
                    <input ref={Input} type="file" accept="image/*" onChange={handleImageSelect} hidden />
                    <img ref={Image} style={{ display: 'block', margin: '5rem auto' }} />
                    {children}
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => Input.current.click()}
                        style={{
                            position: 'fixed', bottom: '1rem', right: '1rem', color: '#fff',
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </main>
            </div>
        </>
    )
}

export default Layout
