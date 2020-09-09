import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useHoverDirty } from 'react-use';
import classes from '../styles/feed.module.css'
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { deleteImage } from '../actions'

const Image = ({ user, _id, imageUrl, author, deleteImage }) => {
    const ref = useRef(null)
    const isHovering = useHoverDirty(ref)
    const history = useHistory()

    const handleClick = async e => {
        e.preventDefault()
        console.log(_id)
        await deleteImage(_id)
    }

    return (
        <div ref={ref} className={classes.root}>
            <img
                src={imageUrl}
                className={classes.post}
                onClick={() => history.push(author.username)}
                style={{
                    filter: isHovering ? 'brightness(70%)' : 'brightness(100%)',
                }}
            />
            <DeleteIcon
                onClick={handleClick}
                style={{
                    color: 'rgba(255, 255, 255, .5)',
                    visibility: user?._id === author.id && isHovering ? 'visible' : 'hidden',
                    position: 'absolute',
                    top: 'calc(50% - 12px)',
                    left: 'calc(50% - 12px)',
                    cursor: 'pointer',
                }}
            />
        </div>
    )
}

export default connect(({ user }) => user, { deleteImage })(Image)
