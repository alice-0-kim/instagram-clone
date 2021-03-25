import React from 'react'
import Grid from '@material-ui/core/Grid'
import Image from './Image'

const Feed = ({ posts = [] }) => (
    <Grid container>
        {posts.map((props, i) => (
            <Grid item key={i} xs={12} sm={4}>
                <Image {...props} />
            </Grid>
        ))}
    </Grid>
)

export default Feed
