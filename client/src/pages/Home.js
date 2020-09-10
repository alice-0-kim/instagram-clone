import React, { useEffect, useState } from 'react'
import { IconButton } from '@material-ui/core'
import { RefreshRounded } from '@material-ui/icons'
import axios from 'axios'
import { sampleSize } from 'lodash'
import Feed from '../components/Feed'
import classes from '../styles/navbar.module.css'

const Home = () => {
    const [images, setImages] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get('/images')
            if (res.data.images) {
                setImages(res.data.images)
            }
        }
        getPosts()
    }, [])

    const handleRefresh = () => {
        setPosts(sampleSize(images, 9))
    }

    useEffect(handleRefresh, [images])

    const HomePage = () => (
        <>
            <div style={{ padding: 24 }}>
                <h1 className={classes.logo}>pik</h1>
                <p style={{ fontSize: 'small', textAlign: 'center', color: '#383838' }}>pik · your · moment</p>
                <IconButton onClick={handleRefresh} style={{ display: 'block', margin: '1rem auto' }}>
                    <RefreshRounded color="primary" />
                </IconButton>
                <Feed posts={posts} />
            </div>
        </>
    )
    return <HomePage />
}

export default Home
