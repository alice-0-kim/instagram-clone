import React from 'react'
import { ResponsivePieCanvas } from '@nivo/pie'
import { useMediaQuery } from '@material-ui/core'

const PieChart = ({ data }) => {
    const tablet = useMediaQuery('(max-width:768px)')
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

    return (
        <div style={{ height: tablet ? 250 : 300 }}>
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
                radialLabelsLinkDiagonalLength={tablet ? 6 : 16}
                radialLabelsLinkHorizontalLength={tablet ? 4 : 24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={3}
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
                                fontFamily: 'Poppins',
                                fontSize: tablet ? 12 : 14,
                            },
                        },
                        legends: {
                            text: {
                                fontFamily: 'Poppins',
                                fontSize: 12,
                            },
                        },
                    }
                }
            />
        </div>
    )
}

export default PieChart
