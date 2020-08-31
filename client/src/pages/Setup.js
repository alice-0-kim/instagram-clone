import React, { useState, useRef } from 'react'
import {
    Button, Collapse, TextField, IconButton,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import classes from '../styles/setup.module.css'

const ContainedButton = ({ title, ...props }) => (
    <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disableElevation
        {...props}
    >
        {title}
    </Button>
)

const Setup = () => {
    const history = useHistory()
    const username = useRef(null)
    const [open, setOpen] = useState(false)

    const submit = async () => {
        if (!username.current?.value) {
            setOpen(true)
            return
        }
        try {
            await axios.get(`/user/${username.current.value}`)
            setOpen(true)
        } catch (err) {
            await axios.put('/me', { username: username.current.value })
            history.push(`/${username.current.value}`)
        }
    }

    const SetupPage = () => {
        return (
            <div className={classes.root}>
                <div className={classes.branding}>
                    <h1 className={classes.logo}>akhl</h1>
                </div>
                <div className={classes.form}>
                    <div style={{ maxWidth: 375, margin: 'auto' }}>
                        <Collapse in={open}>
                            <Alert
                                severity="error"
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
                                {`Username ${username.current?.value} is not available.`}
                            </Alert>
                        </Collapse>
                        <p>You're almost there...</p>
                        <TextField variant="outlined" margin="dense" label="Username" inputRef={username} fullWidth />
                        <ContainedButton title="Save change" onClick={submit} />
                    </div>
                </div>
            </div>
        )
    }

    return <SetupPage />
}

export default Setup
