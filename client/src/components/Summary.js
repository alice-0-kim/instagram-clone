import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ResponsivePieCanvas } from '@nivo/pie'
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
import classes from '../styles/summary.module.css'

const Summary = ({ profile = {} }) => {
    const mobile = useMediaQuery('(max-width:414px)')
    const tablet = useMediaQuery('(max-width:768px)')
    const {
        images = [], animals = [], natures = [], faces = [], foods = [], others = [],
    } = profile
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
    const option = {
        defs: [],
        fill: [],
        legends: tablet ? undefined : [
            {
                anchor: 'right',
                direction: 'column',
                translateX: 0,
                translateY: 0,
                itemWidth: 80,
                itemHeight: 15,
                itemsSpacing: 10,
                symbolSize: 14,
                symbolShape: 'circle',
            },
        ],
    }

    const random = n => Math.floor(Math.random() * n)

    const MyResponsivePieCanvas = ({ data }) => (
        <ResponsivePieCanvas
            data={data}
            margin={{ top: 40, bottom: 40 }}
            startAngle={270}
            endAngle={360}
            pixelRatio={2}
            innerRadius={0.3}
            padAngle={0.1}
            cornerRadius={3}
            colors={d => d.color}
            borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
            radialLabelsSkipAngle={1}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate
            motionStiffness={90}
            motionDamping={15}
            defs={option.defs}
            fill={option.fill}
            legends={option.legends}
            theme={
                {
                    labels: {
                        text: {
                            fontFamily: "Poppins",
                            fontSize: 14,
                        }
                    },
                    legends: {
                        text: {
                            fontFamily: "Poppins",
                            fontSize: 12,
                        }
                    },
                }
            }
        />
    )

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
                    <DialogContent style={{ maxWidth: 480 }}>
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
            {images.length < 10
                ? <>Not enough data collected...</>
                : (
                    <div style={{ height: 300 }}>
                        <MyResponsivePieCanvas data={data} />
                        <Collections />
                    </div>
                )}
        </>
    )
}

export default connect(({ profile }) => profile)(Summary)
