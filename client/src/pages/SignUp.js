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

const SignUp = () => {
    const history = useHistory()
    const givenName = useRef(null)
    const familyName = useRef(null)
    const email = useRef(null)
    const username = useRef(null)
    const password = useRef(null)
    const verify = useRef(null)
    const [open, setOpen] = useState(false)

    const fields = [{
        label: 'Given name',
        ref: givenName,
        type: 'text',
    }, {
        label: 'Family name',
        ref: familyName,
        type: 'text',
    }, {
        label: 'Email',
        ref: email,
        type: 'email',
    }, {
        label: 'Username',
        ref: username,
        type: 'text',
    }, {
        label: 'Password',
        ref: password,
        type: 'password',
    }, {
        label: 'Verify password',
        ref: verify,
        type: 'password',
    }]

    const submit = async () => {
        if (password.current.value !== verify.current.value) return
        const user = {
            givenName: givenName.current.value,
            familyName: familyName.current.value,
            email: email.current.value,
            username: username.current.value,
            password: password.current.value,
        }
        try {
            await axios.post('/auth/local/new', user)
            history.push(`/${user.username}`)
        } catch (err) {
            setOpen(true)
        }
    }

    const SignUpPage = () => (
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
                    {fields.map(({ label, ref, type }) => (
                        <TextField key={label} variant="outlined" margin="dense" label={label} inputRef={ref} type={type} fullWidth />))}
                    <ContainedButton title="Create account" onClick={submit} />
                    <p style={{ textAlign: 'center' }}>
                        Already have an account?
                        <a href="/login" style={{ color: '#3fbac2', marginLeft: '1rem' }}>Log in</a>
                    </p>
                </div>
            </div>
        </div>
    )
    return <SignUpPage />
}

export default SignUp
