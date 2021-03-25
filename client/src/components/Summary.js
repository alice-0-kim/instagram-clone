import React from 'react'
import { connect } from 'react-redux'
import { Moments, Palette } from './albums'
import Collections from './Collections'
import PieChart from './PieChart'
import Placeholder from './utils/Placeholder'

const Summary = ({ profile = {} }) => {
    const { animals = [], natures = [], faces = [], foods = [], others = [] } = profile
    const total = animals.length + natures.length + faces.length + foods.length + others.length
    const data = [
        { label: 'faces', id: 'People', value: faces.length, color: '#f1896b' },
        { label: 'foods', id: 'Food', value: foods.length, color: '#f17790' },
        { label: 'animals', id: 'Animal', value: animals.length, color: '#ab6cbc' },
        { label: 'natures', id: 'Nature', value: natures.length, color: '#6f6dd0' },
        { label: 'others', id: 'Other', value: others.length, color: '#e4d1e7' },
    ]

    return (
        <>
            {total < 10
                ? <Placeholder />
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
