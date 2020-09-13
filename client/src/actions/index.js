import axios from 'axios'

export const SET_USER = 'SET_USER'
export const LOAD_USER = 'LOAD_USER'
export const USER_NOT_FOUND = 'USER_NOT_FOUND'

const setUser = user => ({
    type: SET_USER,
    user,
})

const loadUser = () => ({
    type: LOAD_USER,
})

const userNotFound = () => ({
    type: USER_NOT_FOUND,
})

export const getUser = (force = false) => async (dispatch, getState) => {
    const { user, profile } = getState()
    if (!force && user.loaded) return

    dispatch(loadUser())

    try {
        const self = profile.loaded && user.user.username === profile.profile.username
        const res = await axios.get('/me')
        dispatch(setUser(res.data.user))
        if (self) dispatch(setProfile(res.data.user))
    } catch (err) {
        dispatch(userNotFound())
    }
}

export const updateUser = user => async dispatch => {
    try {
        await axios.put('/me', user)
        dispatch(getUser(true))
    } catch (err) {
        // do nothing
    }
}

export const updateProfilePic = formData => async dispatch => {
    try {
        await axios.put('/me', formData, {
            headers: { 'content-type': 'multipart/form-data' },
        })
        dispatch(getUser(true))
    } catch (err) {
        // do nothing
    }
}

export const SET_PROFILE = 'SET_PROFILE'
export const LOAD_PROFILE = 'LOAD_PROFILE'

const setProfile = profile => ({
    type: SET_PROFILE,
    profile,
})

const loadProfile = () => ({
    type: LOAD_PROFILE,
})

export const getProfile = (username, force = false) => async (dispatch, getState) => {
    const { profile } = getState()
    if (!force && profile.profile?.username === username) return

    dispatch(loadProfile())

    try {
        const res = await axios.get(`/user/${username}`)
        dispatch(setProfile(res.data.user))
    } catch (err) {
        dispatch(userNotFound())
    }
}

export const LOADING = 'LOADING'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const SET = 'SET'

const loading = () => ({
    type: LOADING,
})

const success = () => ({
    type: SUCCESS,
})

const failure = error => ({
    type: FAILURE,
    error,
})

const setImages = images => ({
    type: SET,
    images,
})

export const postImage = formData => async dispatch => {
    try {
        dispatch(loading())
        const res = await axios.post('/image', formData, {
            headers: { 'content-type': 'multipart/form-data' },
        })
        if (res.data.success) {
            dispatch(success())
        } else {
            dispatch(failure(res.data.message))
        }
    } catch (err) {
        // do nothing
    }
}

export const deleteImage = id => async dispatch => {
    try {
        dispatch(loading())
        const res = await axios.delete(`/image/${id}`)
        if (res.data.success) {
            dispatch(getUser(true))
            dispatch(success())
        } else {
            dispatch(failure(res.data.message))
        }
    } catch (err) {
        // do nothing
    }
}

export const getImages = () => async dispatch => {
    try {
        dispatch(loading())
        const res = await axios.get('/images')
        if (res.data.images) {
            dispatch(setImages(res.data.images))
            dispatch(success())
        } else {
            dispatch(failure(res.data.message))
        }
    } catch (err) {
        // do nothing
    }
}
