import React from 'react'
import Feed from '../components/Feed'
import classes from '../styles/home.module.css'

const Home = () => {
    const HomePage = () => (
        <>
            <h1 className={classes.logo}>akhl</h1>
            <div style={{ padding: 24 }}>
                <Feed />
            </div>
        </>
    )
    return <HomePage />
}

export default Home
