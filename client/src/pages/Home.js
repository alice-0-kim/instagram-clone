import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Feed from '../components/Feed'
import classes from '../styles/home.module.css'

const Home = () => {
    const HomePage = () => (
        <>
            <h1 className={classes.logo}>akhl</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/new">
                    <Button variant="contained" color="primary" style={{ color: '#fff', fontWeight: 'bold', textTransform: 'capitalize', width: 150, margin: 5 }} disableElevation>Sign Up</Button>
                </Link>
                <Button variant="outlined" color="primary" style={{ fontWeight: 'bold', textTransform: 'capitalize', width: 150, margin: 5 }}>Log In</Button>
            </div>
            <div style={{ padding: 24 }}>
                <Feed />
            </div>
        </>
    )
    return <HomePage />
}

export default Home
