import React from 'react'
import Spinner from '@material-ui/core/CircularProgress'

const Loading = () => (
    <div style={{
        width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
        <Spinner />
    </div>
)

export default Loading
