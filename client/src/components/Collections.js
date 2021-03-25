import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Button, Grid } from '@material-ui/core'
import Dialog from './utils/Dialog'
import Feed from './Feed'
import classes from '../styles/collections.module.css'

const random = n => Math.floor(Math.random() * n)

const CloseButton = styled(Button)`
    color: #fff;
    text-transform: capitalize;
`

const Collections = ({ data, profile }) => {
    const {
        animals = [], natures = [], faces = [], foods = [], others = []
    } = profile

    const [thumbnails, setThumbnails] = useState({})
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const handleClose = () => setOpen(false)
    const handleOpen = (title, selected) => async () => {
        const result = await Promise.all(profile[selected].map(id => axios.get(`/image/${id}`)))
        setTitle(title)
        setPosts(result.map(({ data }) => data.image))
        setOpen(true)
    }

    const Collection = ({ id, label }) => (
        <>
            <img
                className={classes.thumbnail}
                src={thumbnails[label]?.data.image.imageUrl}
                onClick={handleOpen(id, label)}
            />
            <p>{id}</p>
        </>
    )

    useEffect(() => {
        const loadThumbnails = async () => {
            setThumbnails({
                ...faces.length > 0 ? { faces: await axios.get(`/image/${faces[random(faces.length)]}`) } : {},
                ...foods.length > 0 ? { foods: await axios.get(`/image/${foods[random(foods.length)]}`) } : {},
                ...natures.length > 0 ? { natures: await axios.get(`/image/${natures[random(natures.length)]}`) } : {},
                ...animals.length > 0 ? { animals: await axios.get(`/image/${animals[random(animals.length)]}`) } : {},
                ...others.length > 0 ? { others: await axios.get(`/image/${others[random(others.length)]}`) } : {},
            })
        }
        loadThumbnails()
    }, [])

    return (
        <>
            <Grid container cellHeight="auto">
                {data.map(({ id, label }) => (
                    profile[label].length > 0 && (
                        <Grid item key={id} xs={12} sm={6} spacing={3}>
                            <Collection id={id} label={label} />
                        </Grid>
                    )
                ))}
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                title={title}
                content={<Feed posts={posts} />}
                actions={<CloseButton onClick={handleClose} color="primary" variant="contained">Close</CloseButton>}
            />
        </>
    )
}

export default Collections
