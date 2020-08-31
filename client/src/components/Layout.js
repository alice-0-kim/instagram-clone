import React, { useState } from 'react'
import { Collapse, Fab, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import Navbar from './Navbar'
import ImageUploader from './ImageUploader'

const Layout = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [show, showAlert] = useState(false)

    const handleClose = success => {
        if (success) showAlert(true)
        setOpen(false)
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
                    <Collapse in={show}>
                        <Alert
                            severity="success"
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
                            A new image was successfully uploaded!
                        </Alert>
                    </Collapse>
                    {children}
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => setOpen(true)}
                        style={{
                            position: 'fixed', bottom: '1rem', right: '1rem', color: '#fff',
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </main>
                <ImageUploader open={open} handleClose={handleClose} />
            </div>
        </>
    )
}

export default Layout
