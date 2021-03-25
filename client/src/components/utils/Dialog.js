import React from 'react'
import styled from 'styled-components'
import {
    Dialog,
    DialogContent,
    DialogTitle as Title,
    DialogActions as Actions,
} from '@material-ui/core'

const Content = styled(DialogContent)`
    box-sizing: border-box;
    width: 525px;
    @media (max-width: 600px) {
        width: 100%;
    }
`

export default ({
    open, title, onClose, content, actions,
}) => (
    <Dialog open={open} onClose={onClose}>
        <Title>{title}</Title>
        <Content>
            {content}
        </Content>
        <Actions style={{ padding: '1rem' }}>
            {actions}
        </Actions>
    </Dialog>
)
