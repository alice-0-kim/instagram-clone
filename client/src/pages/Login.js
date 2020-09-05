import React, { useRef, useState } from 'react'
import {
    Button, Collapse, TextField, IconButton,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import classes from '../styles/auth.module.css'

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

const Login = () => {
    const history = useHistory()
    const username = useRef(null)
    const password = useRef(null)
    const [open, setOpen] = useState(false)

    const fields = [{
        label: 'Username',
        inputRef: username,
        type: 'text',
    }, {
        label: 'Password',
        inputRef: password,
        type: 'password',
    }]

    const submit = async () => {
        const user = {
            username: username.current.value,
            password: password.current.value,
        }
        try {
            await axios.post('/auth/local/login', user)
            history.push(`/${user.username}`)
        } catch (err) {
            setOpen(true)
        }
    }

    const LoginPage = () => (
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
                            Authentication failed!
                        </Alert>
                    </Collapse>
                    <a href="/auth/google">
                        <ContainedButton title="Sign in with Google" />
                    </a>
                    <hr className={classes.divider} />
                    {fields.map((props, i) => (
                        <TextField key={i} variant="outlined" margin="dense" {...props} fullWidth />))}
                    <ContainedButton title="Log in" onClick={submit} />
                    <p style={{ textAlign: 'center' }}>
                        Don't have an account yet?
                        <a href="/new" style={{ color: '#3fbac2', marginLeft: '1rem' }}>Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    )
    return <LoginPage />
}

export default Login
