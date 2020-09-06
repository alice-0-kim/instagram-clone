import React from 'react'
import classes from '../styles/feed.module.css'
import { useHistory } from 'react-router-dom'

const Feed = ({ posts = [] }) => {
    const history = useHistory()
    return (
        <div>
            {posts.map(({ imageUrl, author }, i) => (
                <img
                    key={i}
                    src={imageUrl}
                    className={classes.post}
                    onClick={() => history.push(author.username)}
                />
            ))}
        </div>
    )
}

export default Feed
