import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import classes from '../styles/signup.module.css'

const ContainedButton = ({ title }) => <Button className={classes.button} variant="contained" color="primary" disableElevation>{title}</Button>

const SignUp = () => {
    const fields = [{
        label: 'Email',
        ref: useRef(null),
    }, {
        label: 'Username',
        ref: useRef(null),
    }, {
        label: 'Password',
        ref: useRef(null),
    }, {
        label: 'Confirm password',
        ref: useRef(null),
    }]
    const SignUpPage = () => (
        <div className={classes.root}>
            <div className={classes.branding}>
                <h1 className={classes.logo}>akhl</h1>
            </div>
            <div className={classes.form}>
                <div style={{ maxWidth: 375, margin: 'auto' }}>
                    <Link to="/auth/google">
                        <ContainedButton title="Sign up with Google" />
                    </Link>
                    <hr className={classes.divider} />
                    {fields.map(({ label, ref }) => (
                        <TextField key={label} variant="outlined" margin="dense" label={label} inputRef={ref} fullWidth />))}
                    <ContainedButton title="Create account" />
                </div>
            </div>
        </div>
    )
    return <SignUpPage />
}

export default SignUp
