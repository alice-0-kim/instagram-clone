import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Feed from '../components/Feed'
import classes from '../styles/home.module.css'

const Home = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get('/images')
            if (res.data.posts) {
                setPosts(res.data.posts)
            }
        }
        getPosts()
    }, [])
    const HomePage = () => (
        <>
            <h1 className={classes.logo}>akhl</h1>
            <div style={{ padding: 24 }}>
                <Feed posts={posts} />
            </div>
        </>
    )
    return <HomePage />
}

export default Home
