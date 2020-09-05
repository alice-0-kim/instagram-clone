import React from 'react'
import { connect } from 'react-redux'
import { ResponsivePieCanvas } from '@nivo/pie'

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

    return (
        <>
            {images.length < 10
                ? <>Not enough data collected...</>
                : <div style={{ height: 300 }}>
                    <MyResponsivePieCanvas data={data} />
                </div>}
        </>
    )
}

export default connect(({ profile }) => profile)(Summary)
