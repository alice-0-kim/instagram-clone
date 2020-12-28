import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
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
import PieChart from './PieChart'
import classes from '../styles/summary.module.css'

const Summary = ({ profile = {} }) => {
    const mobile = useMediaQuery('(max-width:414px)')
    // const tablet = useMediaQuery('(max-width:768px)')
    const {
        animals = [], natures = [], faces = [], foods = [], others = [],
    } = profile
    const total = animals.length + natures.length + faces.length + foods.length + others.length
    const data = [
        {
            label: 'faces',
            id: 'People',
            value: faces.length,
            color: '#8c96c6',
        },
        {
            label: 'foods',
            id: 'Food',
            value: foods.length,
            color: '#9ebcda',
        },
        {
            label: 'animals',
            id: 'Animal',
            value: animals.length,
            color: '#bfd3e6',
        },
        {
            label: 'natures',
            id: 'Nature',
            value: natures.length,
            color: '#e0ecf4',
        },
        {
            label: 'others',
            id: 'Other',
            value: others.length,
            color: '#f7caca',
        },
    ]

    const random = n => Math.floor(Math.random() * n)

    const Collections = () => {
        const [thumbnails, setThumbnails] = useState({})
        const [open, setOpen] = useState(false)
        const [title, setTitle] = useState('')
        const [posts, setPosts] = useState([])

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

    return (
        <>
            {total < 10
                ? <p style={{ textAlign: 'center', fontSize: 'small', color: '#383838' }}>Not enough data collected</p>
                : (
                    <div>
                        <PieChart data={data} />
                        <Collections />
                    </div>
                )}
        </>
    )
}

export default connect(({ user, profile }) => ({ ...profile, user }))(Summary)
