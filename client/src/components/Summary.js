import React from 'react'
import { connect } from 'react-redux'

const Summary = ({ profile = {} }) => {
    const { images = [] } = profile
    return (
        <>
            {images.length < 10
                ? <>Not enough data collected...</>
                : <>Here's the summary!</>}
        </>
    )
}

export default connect(({ profile }) => profile)(Summary)
