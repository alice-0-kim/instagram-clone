import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useHoverDirty } from 'react-use'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import classes from '../styles/feed.module.css'
import { deleteImage } from '../actions'

const Image = ({
    user, _id, imageUrl, thumbnail = imageUrl, author, deleteImage,
}) => {
    const [loaded, setLoaded] = useState(false)
    const Root = useRef(null)
    const Image = useRef(null)
    const isHovering = useHoverDirty(Root)
    const history = useHistory()

    const handleClick = async e => {
        e.preventDefault()
        await deleteImage(_id)
    }

    return (
        <div ref={Root} className={classes.root}>
            <img
                ref={Image}
                src={loaded ? imageUrl : thumbnail}
                className={classes.post}
                onClick={() => history.push(author.username)}
                onLoad={() => setLoaded(true)}
                style={{
                    // background: `url(${thumbnail}) no-repeat scroll 0 0`,
                    filter: loaded ? `brightness(${isHovering ? 70 : 100}%)` : 'blur(4px)',
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
