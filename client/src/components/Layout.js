import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Collapse, Fab, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import Navbar from './Navbar'
import ImageUploader from './ImageUploader'
import { connect } from 'react-redux'
import { getUser } from '../actions'

const Layout = ({ children, getUser, user }) => {
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [show, showAlert] = useState(false)

    const handleOpen = () => {
        if (user) setOpen(true)
        else history.push('/login')
    }

    const handleClose = success => {
        if (success) showAlert(true)
        setOpen(false)
    }

    useEffect(() => {
        const loadUser = async () => await getUser()
        loadUser()
    }, [])

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
                        onClick={handleOpen}
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

export default connect(({ user }) => user, { getUser })(Layout)
