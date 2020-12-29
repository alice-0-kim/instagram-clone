import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
} from '@material-ui/core'
import Feed from './Feed'

const Album = styled.div`
    background: ${({ to }) => to};
    background: ${({ from, to }) => `-webkit-linear-gradient(to right, ${from}, ${to})`};
    background: ${({ from, to }) => `linear-gradient(to right, ${from}, ${to})`};
    height: 100px;
    border-radius: 5px;
    display: flex;
    flex-direction: column-reverse;
    margin: 10px auto;
    span {
        color: whitesmoke;
        font-size: small;
        text-transform: uppercase;
        margin: 5px;
    }
`

const Albums = ({ profile }) => {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])

    const getResult = (selected) => {
        if (selected === 'all')
            return Promise.all(profile.images.map(({ id }) => axios.get(`/image/${id}`)))
        else
            return Promise.all(profile[selected].map(id => axios.get(`/image/${id}`)))
    }

    const handleOpen = (title, selected) => async () => {
        // const result = await Promise.all(profile[selected].map(id => axios.get(`/image/${id}`)))
        const result = await getResult(selected)
        console.log(result)
        setTitle(title)
        setPosts(result.map(({ data }) => data.image))
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    return (
        <>
            <Album from="#ffa751" to="#ffe259" onClick={handleOpen('Happy moments', 'faces')}>
                <span>Happy moments</span>
            </Album>
            <Album from="#ffa751" to="#ffe259" onClick={handleOpen('Color board', 'all')}>
                <span>Color board</span>
            </Album>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent style={{ maxWidth: 495 }}>
                    <Feed posts={posts} />
                </DialogContent>
                <DialogActions style={{ padding: '1rem' }}>
                    <Button onClick={handleClose} color="primary" variant="contained" style={{ color: '#fff', textTransform: 'capitalize' }}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Albums
