import React, { useState } from 'react'
import { Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import Layout from '../components/Layout'
import Feed from '../components/Feed'
import { user } from '../constant'
import classes from '../styles/profile.module.css'

const Profile = () => {
    const [tab, setTab] = useState('Feed')
    const ProfilePage = () => {
        const {
            username, posts, followers, following, short,
        } = user
        return (
            <Layout>
                <div className={classes.profile}>
                    <img
                        src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                        className={classes.picture}
                    />
                    <div>
                        <p>{username}</p>
                        <div style={{ fontSize: 'small' }}>
                            <p>
                                <span>{`${posts} posts `}</span>
                                <span>{`${followers} followers `}</span>
                                <span>{`${following} following`}</span>
                            </p>
                            <p>{short}</p>
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
                        <Tab value="Feed" label="Feed" />
                        <Tab value="Summary" label="Summary" />
                    </TabList>
                    <TabPanel value="Feed">
                        <Feed />
                    </TabPanel>
                    <TabPanel value="Summary">
                        Summary
                    </TabPanel>
                </TabContext>
            </Layout>
        )
    }
    return <ProfilePage />
}

export default Profile
