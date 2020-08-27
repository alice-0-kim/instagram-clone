import React from 'react'
import Layout from '../components/Layout'

const Profile = () => {
    const user = {
        username: 'yehee',
        posts: 10,
        followers: 14,
        following: 4,
        short: 'Hello, world!',
    }
    const photos = [
        { url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' },
        { url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' },
        { url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' },
        { url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' },
        { url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' },
        { url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' },
    ]
    const ProfilePage = () => {
        const {
            username, posts, followers, following, short,
        } = user
        return (
            <Layout>
                <div style={{ display: 'flex', margin: '5rem auto', alignItems: 'center' }}>
                    <img
                        src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            margin: '0 3rem',
                        }}
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
                <div>
                    {photos.map(({ url }, i) => (
                        <img
                            key={i}
                            src={url}
                            style={{
                                width: 310, height: 310, margin: 5, objectFit: 'cover',
                            }}
                        />
                    ))}
                </div>
            </Layout>
        )
    }
    return <ProfilePage />
}

export default Profile
