import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    GridListTile,
    GridList,
    useMediaQuery,
} from '@material-ui/core'
import Feed from './Feed'
import classes from '../styles/collections.module.css'

const random = n => Math.floor(Math.random() * n)

const Collections = ({ data, profile }) => {
    const { animals = [], natures = [], faces = [], foods = [], others = [] } = profile

    const [thumbnails, setThumbnails] = useState({})
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])

    const mobile = useMediaQuery('(max-width:414px)')

    const handleOpen = (title, selected) => async () => {
        const result = await Promise.all(profile[selected].map(id => axios.get(`/image/${id}`)))
        setTitle(title)
        setPosts(result.map(({ data }) => data.image))
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

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
            <GridList cols={mobile ? 1 : 2} style={{ margin: '40px auto' }} cellHeight="auto" spacing={8}>
                {data.map(({ id, label }) => (
                    profile[label].length > 0 && (
                        <GridListTile key={id}>
                            <Collection id={id} label={label} />
                        </GridListTile>
                    )
                ))}
            </GridList>
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

export default Collections
