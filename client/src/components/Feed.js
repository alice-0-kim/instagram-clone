import React from 'react'
import classes from '../styles/feed.module.css'

const Feed = ({ posts = [] }) => (
    <div>
        {posts.map(({ imageUrl }, i) => (
            <img
                key={i}
                src={imageUrl}
                className={classes.post}
            />
        ))}
    </div>
)

export default Feed
