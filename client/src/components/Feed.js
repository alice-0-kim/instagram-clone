import React from 'react'
import Image from './Image'

const Feed = ({ posts = [] }) => (
    <>
        {posts.map((props, i) => <Image key={i} {...props} />)}
    </>
)

export default Feed
