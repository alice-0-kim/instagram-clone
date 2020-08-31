import React from 'react'
import '../styles/feed.module.css'

const Feed = ({ posts = [] }) => (
    <div>
        {posts.map(({ imageUrl }, i) => (
            <img
                key={i}
                src={imageUrl}
            />
        ))}
    </div>
)

export default Feed
