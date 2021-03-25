import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Dialog from '../utils/Dialog'
import Feed from '../Feed'
import Album from './Album'
import Placeholder from '../utils/Placeholder'
import pink from '../../assets/pink.png'

const CloseButton = styled(Button)`
    color: #fff;
    text-transform: capitalize;
`

const Moments = ({ title, profile }) => {
    const [open, setOpen] = useState(false)
    const [posts, setPosts] = useState([])

    const handleOpen = async () => {
        const result = await Promise.all(profile.faces.map(id => axios.get(`/image/${id}`)))
        setPosts(result
            .map(({ data }) => data.image)
            .filter(({ face }) => face.some(({ joyLikelihood: joy }) => joy === 'VERY_LIKELY' || joy === 'LIKELY')))
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    return (
        <>
            <Album from="#ffbe0b" to="#ffbe0b" url={pink} onClick={handleOpen}>
                <span>{title}</span>
            </Album>
            <Dialog
                open={open}
                onClose={handleClose}
                title={title}
                content={posts.length ? <Feed posts={posts} /> : <Placeholder />}
                actions={<CloseButton onClick={handleClose} color="primary" variant="contained">Close</CloseButton>}
            />
        </>
    )
}

export default Moments
