import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
} from '@material-ui/core'
import Feed from '../Feed'
import Placeholder from '../utils/Placeholder'

const Album = styled.div`
    background: ${({ to }) => to};
    background: ${({ from, to }) => `-webkit-linear-gradient(to right, ${from}, ${to})`};
    background: ${({ from, to }) => `linear-gradient(to right, ${from}, ${to})`};
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column-reverse;
    height: 100px;
    margin: 10px auto;
    span {
        color: whitesmoke;
        font-size: small;
        text-transform: uppercase;
        margin: 10px;
    }
`

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
            <Album from="#5e548e" to="#9f86c0" onClick={handleOpen}>
                <span>{title}</span>
            </Album>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent style={{ maxWidth: 495 }}>
                    {posts.length ? <Feed posts={posts} /> : <Placeholder />}
                </DialogContent>
                <DialogActions style={{ padding: '1rem' }}>
                    <CloseButton onClick={handleClose} color="primary" variant="contained">Close</CloseButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Palette
