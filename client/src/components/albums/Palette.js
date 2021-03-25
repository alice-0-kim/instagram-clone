import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Dialog from '../utils/Dialog'
import Feed from '../Feed'
import Album from './Album'
import Placeholder from '../utils/Placeholder'
import cream from '../../assets/cream.jpeg'

const CloseButton = styled(Button)`
    color: #fff;
    text-transform: capitalize;
`

const Palette = ({ title, profile }) => {
    const [open, setOpen] = useState(false)
    const [posts, setPosts] = useState([])

    const sortByColor = (a, b) => {
        if (a.dominantColor > b.dominantColor)
            return 1
        if (a.dominantColor < b.dominantColor)
            return -1
        return 0
    }

    const handleOpen = async () => {
        const result = await Promise.all(profile.images.map(({ id }) => axios.get(`/image/${id}`)))
        setPosts(result
            .map(({ data }) => data.image)
            .filter(({ dominantColor }) => dominantColor.length)
            .sort(sortByColor))
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    return (
        <>
            <Album url={cream} from="#ff5c8a" to="#ff5c8a" onClick={handleOpen}>
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

export default Palette
