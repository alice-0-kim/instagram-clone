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
import url from '../../assets/background.jpg'

const Album = styled.div`
    background: ${({ to }) => to};
    background: ${({ from, to }) => `-webkit-linear-gradient(to right, ${from}, ${to})`};
    background: ${({ from, to }) => `linear-gradient(to right, ${from}, ${to})`};
    // background-image: url(${() => url});
    background-size: cover;
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

const Moments = ({ title, type, profile }) => {
    const [open, setOpen] = useState(false)
    const [posts, setPosts] = useState([])

    const handleOpen = async () => {
        const result = await Promise.all(profile['faces'].map(id => axios.get(`/image/${id}`)))
        setPosts(result
            .map(({ data }) => data.image)
            .filter(({ face }) => face.some(({ joyLikelihood: joy }) => joy === 'VERY_LIKELY' || joy === 'LIKELY')))
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    return (
        <>
            <Album from="#ffbe0b" to="#ffbe0b" onClick={handleOpen}>
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

export default Moments
