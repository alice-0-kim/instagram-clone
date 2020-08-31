import React, { useRef } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import classes from '../styles/login.module.css'

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

    const fields = [{
        label: 'Username',
        ref: username,
    }, {
        label: 'Password',
        ref: password,
    }]

    const submit = async () => {
        const user = {
            username: username.current.value,
            password: password.current.value,
        }
        await axios.post('/auth/local', user)
        history.push('/')
    }
    const LoginPage = () => (
        <div className={classes.root}>
            <div className={classes.branding}>
                <h1 className={classes.logo}>akhl</h1>
            </div>
            <div className={classes.form}>
                <div style={{ maxWidth: 375, margin: 'auto' }}>
                    <a href="/auth/google">
                        <ContainedButton title="Sign in with Google" />
                    </a>
                    <hr className={classes.divider} />
                    {fields.map(({ label, ref }) => (
                        <TextField key={label} variant="outlined" margin="dense" label={label} inputRef={ref} fullWidth />))}
                    <ContainedButton title="Log in" onClick={submit} />
                </div>
            </div>
        </div>
    )
    return <LoginPage />
}

export default Login
