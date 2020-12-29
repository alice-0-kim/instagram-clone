import React from 'react'
import { connect } from 'react-redux'
import { Moments, Palette } from './library'
import Collections from './Collections'
import PieChart from './PieChart'

const Summary = ({ profile = {} }) => {
    const { animals = [], natures = [], faces = [], foods = [], others = [] } = profile
    const total = animals.length + natures.length + faces.length + foods.length + others.length
    const data = [
        { label: 'faces', id: 'People', value: faces.length, color: '#8c96c6' },
        { label: 'foods', id: 'Food', value: foods.length, color: '#9ebcda' },
        { label: 'animals', id: 'Animal', value: animals.length, color: '#bfd3e6' },
        { label: 'natures', id: 'Nature', value: natures.length, color: '#e0ecf4' },
        { label: 'others', id: 'Other', value: others.length, color: '#f7caca' },
    ]

    return (
        <>
            {total < 10
                ? <p style={{ textAlign: 'center', fontSize: 'small', color: '#383838' }}>Not enough data collected</p>
                : (
                    <div>
                        <PieChart data={data} />
                        <Moments title="Happy moments" type="" profile={profile} />
                        <Palette title="Palette" profile={profile} />
                        <Collections data={data} profile={profile} />
                    </div>
                )}
        </>
    )
}

export default connect(({ user, profile }) => ({ ...profile, user }))(Summary)
