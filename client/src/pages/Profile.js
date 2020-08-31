import React, { useState, useEffect } from 'react'
import { Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Feed from '../components/Feed'
import classes from '../styles/profile.module.css'
import profile from '../assets/classic.png'

const Profile = () => {
    const [tab, setTab] = useState('Feed')
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get(`/user/${id}`)
            if (res.data.success) {
                setUser(res.data.user)
                const result = await Promise.all(res.data.user.images.map(id => axios.get(`/image/${id}`)))
                setPosts(result.map(({ data }) => data.image))
            }
        }
        getPosts()
    }, [])

    const ProfilePage = () => {
        const {
            imageUrl, givenName, username = givenName?.toLowerCase(),
            followers = 10, following = 10,
        } = user
        return (
            <>
                <div className={classes.profile}>
                    <img
                        src={imageUrl || profile}
                        className={classes.picture}
                    />
                    <div>
                        <p>{username}</p>
                        <div style={{ fontSize: 'small' }}>
                            <p style={{ width: 200, display: 'flex', justifyContent: 'space-between' }}>
                                <span>{`${posts.length} posts`}</span>
                                <span>{`${followers} followers`}</span>
                                <span>{`${following} following`}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <TabContext value={tab}>
                    <TabList
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(e, v) => setTab(v)}
                    >
                        <Tab value="Feed" label="Posts" />
                        <Tab value="Summary" label="Summary" />
                    </TabList>
                    <TabPanel value="Feed">
                        <Feed posts={posts} />
                    </TabPanel>
                    <TabPanel value="Summary">
                        Summary
                    </TabPanel>
                </TabContext>
            </>
        )
    }
    return <ProfilePage />
}

export default Profile
