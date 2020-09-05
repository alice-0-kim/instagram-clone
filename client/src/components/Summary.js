import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ResponsivePieCanvas } from '@nivo/pie'
import axios from 'axios'
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core'
import Feed from './Feed'

const Summary = ({ profile = {} }) => {
    const { images = [], animals = [], natures = [], faces = [], foods = [], others = [] } = profile
    const data = [
        {
            "id": "face",
            "label": "face",
            "value": faces.length,
            "color": "#3FBAC2"
        },
        {
            "id": "food",
            "label": "food",
            "value": foods.length,
            "color": "#E193B1"
        },
        {
            "id": "animal",
            "label": "animal",
            "value": animals.length,
            "color": "#FF5588"
        },
        {
            "id": "nature",
            "label": "nature",
            "value": natures.length,
            "color": "#5EBAA3"
        },
        {
            "id": "other",
            "label": "other",
            "value": others.length,
            "color": "#FFD54D"
        }
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
                itemWidth: 60,
                itemHeight: 14,
                itemsSpacing: 2,
                symbolSize: 14,
                symbolShape: 'circle'
            }
        ]
    }

    const MyResponsivePieCanvas = ({ data }) => (
        <ResponsivePieCanvas
            data={data}
            margin={{ top: 40, bottom: 40, }}
            pixelRatio={1}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={d => d.color}
            borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={option.defs}
            fill={option.fill}
            legends={option.legends}
            isInteractive
        />
    )

    const Collections = () => {
        const [thumbnails, setThumbnails] = useState({})
        const [open, setOpen] = useState(false)
        const [posts, setPosts] = useState([])

        const handleOpen = selected => async () => {
            const result = await Promise.all(profile[selected].map(id => axios.get(`/image/${id}`)))
            setPosts(result.map(({ data }) => data.image))
            setOpen(true)
        }

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
                <div style={{ margin: '2rem auto' }}>
                    {faces.length > 0 && <div style={{ width: 230, display: 'inline-block', margin: '10px 5px' }}><img src={thumbnails.faces?.data.image.imageUrl} style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%', display: 'block', margin: 'auto', cursor: 'pointer' }} onClick={handleOpen('faces')} /><p style={{ textAlign: 'center', fontSize: 'small', textTransform: 'uppercase' }}>People</p></div>}
                    {foods.length > 0 && <div style={{ width: 230, display: 'inline-block', margin: '10px 5px' }}><img src={thumbnails.foods?.data.image.imageUrl} style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%', display: 'block', margin: 'auto', cursor: 'pointer' }} onClick={handleOpen('foods')} /><p style={{ textAlign: 'center', fontSize: 'small', textTransform: 'uppercase' }}>Food</p></div>}
                    {natures.length > 0 && <div style={{ width: 230, display: 'inline-block', margin: '10px 5px' }}><img src={thumbnails.natures?.data.image.imageUrl} style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%', display: 'block', margin: 'auto', cursor: 'pointer' }} onClick={handleOpen('natures')} /><p style={{ textAlign: 'center', fontSize: 'small', textTransform: 'uppercase' }}>Nature</p></div>}
                    {animals.length > 0 && <div style={{ width: 230, display: 'inline-block', margin: '10px 5px' }}><img src={thumbnails.animals?.data.image.imageUrl} style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%', display: 'block', margin: 'auto', cursor: 'pointer' }} onClick={handleOpen('animals')} /><p style={{ textAlign: 'center', fontSize: 'small', textTransform: 'uppercase' }}>Animal</p></div>}
                    {others.length > 0 && <div style={{ width: 230, display: 'inline-block', margin: '10px 5px' }}><img src={thumbnails.others?.data.image.imageUrl} style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%', display: 'block', margin: 'auto', cursor: 'pointer' }} onClick={handleOpen('others')} /><p style={{ textAlign: 'center', fontSize: 'small', textTransform: 'uppercase' }}>Other</p></div>}
                </div >
                <Dialog open={open}>
                    <DialogTitle>Collections</DialogTitle>
                    <DialogContent style={{ width: 480 }}>
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
                : <div style={{ height: 300 }}>
                    <MyResponsivePieCanvas data={data} />
                    <Collections />
                </div>}
        </>
    )
}

export default connect(({ profile }) => profile)(Summary)
