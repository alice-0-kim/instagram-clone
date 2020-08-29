import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Feed from '../components/Feed'
import classes from '../styles/home.module.css'

const Home = () => {
    const HomePage = () => (
        <>
            <h1 className={classes.logo}>akhl</h1>
            <div className={classes.container}>
                <Link to="/new">
                    <Button className={classes.contained} variant="contained" color="primary" disableElevation>
                        Sign Up
                    </Button>
                </Link>
                <Button className={classes.outlined} variant="outlined" color="primary">
                    Log In
                </Button>
            </div>
            <div style={{ padding: 24 }}>
                <Feed />
            </div>
        </>
    )
    return <HomePage />
}

export default Home
