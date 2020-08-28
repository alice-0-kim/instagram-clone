import React from 'react'
import { photos } from '../constant'
import '../styles/feed.module.css'

const Feed = () => {
    return (
        <div>
            {photos.map(({ url }, i) => (
                <img
                    key={i}
                    src={url}
                />
            ))}
        </div>
    )
}

export default Feed
