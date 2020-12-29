import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
    display: flex;
    height: 240px;
    width: 480px;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`
const Text = styled.p`
    text-align: center;
    font-size: small;
    color: #383838;
`

const Placeholder = () => {
    return (
        <Section>
            <Text>Not enough data collected</Text>
        </Section>
    )
}

export default Placeholder
