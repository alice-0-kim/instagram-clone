import React from 'react'
import { connect } from 'react-redux'
import Image from './Image'
import Loading from './Loading'

const Feed = ({ loading, posts = [] }) => {
    return (
        loading
            ? <Loading />
            : <div>
                {posts.map((props, i) => <Image key={i} {...props} />)}
            </div>
    )
}

export default connect(({ image }) => image)(Feed)
