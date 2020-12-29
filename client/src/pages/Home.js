import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { RefreshRounded } from '@material-ui/icons'
import { sampleSize } from 'lodash'
import Feed from '../components/Feed'
import Loading from '../components/utils/Loading'
import classes from '../styles/navbar.module.css'
import { getImages } from '../actions'

const Home = ({ loading, getImages, images }) => {
    const [posts, setPosts] = useState([])
    const handleRefresh = () => setPosts(sampleSize(images, 9))

    useEffect(() => {
        const getPosts = async () => getImages()
        getPosts()
    }, [])
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
    return loading ? <Loading /> : <HomePage />
}

export default connect(({ image }) => image, { getImages })(Home)
