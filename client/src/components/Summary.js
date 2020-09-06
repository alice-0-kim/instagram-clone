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
    const {
        images = [], animals = [], natures = [], faces = [], foods = [], others = [],
    } = profile
    const data = [
        {
            label: 'faces',
            id: 'People',
            value: faces.length,
            color: '#3FBAC2',
        },
        {
            label: 'foods',
            id: 'Food',
            value: foods.length,
            color: '#E193B1',
        },
        {
            label: 'animals',
            id: 'Animal',
            value: animals.length,
            color: '#FF5588',
        },
        {
            label: 'natures',
            id: 'Nature',
            value: natures.length,
            color: '#5EBAA3',
        },
        {
            label: 'others',
            id: 'Other',
            value: others.length,
            color: '#FFD54D',
        },
    ]
    const option = {
        defs: [],
        fill: [],
        legends: [
            {
                anchor: 'bottom',
                direction: 'row',
                translateX: 0,
                translateY: 40,
                itemWidth: 80,
                itemHeight: 15,
                itemsSpacing: 10,
                symbolSize: 14,
                symbolShape: 'circle',
            },
        ],
    }

    const MyResponsivePieCanvas = ({ data }) => (
        <ResponsivePieCanvas
            data={data}
            margin={{ top: 40, bottom: 40 }}
            endAngle={150}
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
                            fontSize: 14,
                        }
                    },
                }
            }
        />
    )

    const Collections = () => {
        const [thumbnails, setThumbnails] = useState({})
        const [open, setOpen] = useState(false)
        const [posts, setPosts] = useState([])
        const matches = useMediaQuery('(max-width:414px)')

        const handleOpen = selected => async () => {
            const result = await Promise.all(profile[selected].map(id => axios.get(`/image/${id}`)))
            setPosts(result.map(({ data }) => data.image))
            setOpen(true)
        }

        const Collection = ({ id, label }) => (
            <>
                <img
                    className={classes.thumbnail}
                    src={thumbnails[label]?.data.image.imageUrl}
                    onClick={handleOpen(label)}
                />
                <p>{id}</p>
            </>
        )

        useEffect(() => {
            const loadThumbnails = async () => {
                setThumbnails({
                    ...faces.length > 0 ? { faces: await axios.get(`/image/${faces[0]}`) } : {},
                    ...foods.length > 0 ? { foods: await axios.get(`/image/${foods[0]}`) } : {},
                    ...natures.length > 0 ? { natures: await axios.get(`/image/${natures[0]}`) } : {},
                    ...animals.length > 0 ? { animals: await axios.get(`/image/${animals[0]}`) } : {},
                    ...others.length > 0 ? { others: await axios.get(`/image/${others[0]}`) } : {},
                })
            }
            loadThumbnails()
        }, [])

        return (
            <>
                <GridList cols={matches ? 1 : 2} style={{ margin: '40px auto' }}>
                    {data.map(({ id, label }) => (
                        profile[label].length > 0 && (
                            <GridListTile>
                                <Collection id={id} label={label} />
                            </GridListTile>
                        )
                    ))}
                </GridList>
                <Dialog open={open}>
                    <DialogTitle>Collections</DialogTitle>
                    <DialogContent style={{ maxWidth: 480 }}>
                        <Feed posts={posts} />
                    </DialogContent>
                    <DialogActions style={{ padding: '1rem' }}>
                        <Button onClick={() => setOpen(false)} color="primary" variant="contained" style={{ color: '#fff', textTransform: 'capitalize' }}>Go back</Button>
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
