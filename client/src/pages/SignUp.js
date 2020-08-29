import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button, TextField, } from '@material-ui/core'
import classes from '../styles/signup.module.css'

const SignUp = () => {
    const fields = [{
        label: "Email",
        ref: useRef(null),
    }, {
        label: "Username",
        ref: useRef(null),
    }, {
        label: "Password",
        ref: useRef(null),
    }, {
        label: "Confirm password",
        ref: useRef(null),
    }]
    const SignUpPage = () => {
        return (
            <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ backgroundColor: '#3fbac2', width: '50%', display: 'flex', alignItems: 'center' }}>
                    <h1 style={{
                        fontFamily: `'Poppins', sans-serif`,
                        fontWeight: 700,
                        color: '#fff',
                        margin: 'auto',
                    }}>akhl</h1>
                </div>
                <div style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
                    <div style={{ maxWidth: 375, margin: 'auto' }}>
                        <Link to="/auth/google">
                            <Button variant="contained" color="primary" style={{ textTransform: 'none', fontWeight: 700, color: '#fff', width: '100%', margin: '1.75rem auto' }} disableElevation>Sign up with Google</Button>
                        </Link>
                        <hr className={classes.divider} />
                        {fields.map(({ label, ref }) => (
                            <TextField key={label} variant="outlined" margin="dense" label={label} inputRef={ref} fullWidth />))}
                        <Button variant="contained" color="primary" style={{ textTransform: 'none', fontWeight: 700, color: '#fff', width: '100%', margin: '1.75rem auto' }} disableElevation>Create account</Button>
                    </div>
                </div>
            </div>
        )
    }
    return <SignUpPage />
}

export default SignUp;
