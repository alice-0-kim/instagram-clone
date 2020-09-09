import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import {
    Button,
    Collapse,
    CircularProgress as Spinner,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControlLabel,
    IconButton,
    Switch,
    withStyles,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import { getUser, postImage } from '../actions'

const StyledLabel = withStyles(() => ({
    label: {
        fontSize: 'small',
        color: '#383838',
        marginRight: '.5rem',
    },
}))(FormControlLabel)

const StyledSwitch = withStyles(theme => ({
    root: {
        width: 28,
        height: 14,
        padding: 0,
        display: 'flex',
        overflow: 'visible',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch)

const ImageUploader = ({
    open, loading, success, error, handleClose, getUser, postImage,
}) => {
    const Input = useRef(null)
    const Image = useRef(null)
    const [checked, setChecked] = useState(false)
    const [show, showAlert] = useState(false)
    const [message, setMessage] = useState('')

    const handleImageUpload = async () => {
        if (!Image.current.file) {
            setMessage('You didn\'t select an image!')
            showAlert(true)
            return
        }
        const formData = new FormData()
        formData.append('private', checked)
        formData.append('myImage', Image.current.file)
        await postImage(formData)
        if (success) {
            await getUser(true)
            handleClose(true)
        } else {
            setMessage(`You violated ${error}!`)
            showAlert(true)
        }
    }

    const handleImageSelect = e => {
        const [file] = e.target.files
        if (file) {
            const reader = new FileReader()
            const { current } = Image
            current.file = file
            reader.onload = e => {
                current.src = e.target.result
            }
            reader.readAsDataURL(file)
        }
    }

    const handleChange = e => setChecked(e.target.checked)

    return (
        <Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" disableTypography style={{ fontWeight: 500 }}>Upload image</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ fontSize: 14 }}>
                    To upload a new image, click on the box below to select a file.
                </DialogContentText>
                <Collapse in={show}>
                    <Alert
                        severity="error"
                        action={(
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    showAlert(false)
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        )}
                    >
                        {message}
                    </Alert>
                </Collapse>
                <input ref={Input} type="file" accept="image/*" onChange={handleImageSelect} hidden />
                <img
                    ref={Image}
                    style={{
                        display: 'block', margin: '5rem auto', width: 150, height: 150, objectFit: 'cover',
                    }}
                    onClick={() => Input.current.click()}
                />
                <StyledLabel
                    label="Make it private"
                    labelPlacement="start"
                    control={<StyledSwitch checked={checked} onChange={handleChange} name="visibility" />}
                />
            </DialogContent>
            <DialogActions style={{ padding: '1rem' }}>
                <Button onClick={() => handleClose(false)} color="primary" style={{ textTransform: 'capitalize' }}>Cancel</Button>
                <Button onClick={handleImageUpload} color="primary" variant="contained" disabled={loading} style={{ color: '#fff', textTransform: 'capitalize' }}>
                    {loading ? <Spinner size={20} /> : 'Upload'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default connect(({ image }) => image, { getUser, postImage })(ImageUploader)
