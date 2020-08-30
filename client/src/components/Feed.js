import React from 'react'
import { photos } from '../constant'
import '../styles/feed.module.css'

const Feed = ({ posts = photos }) => (
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
