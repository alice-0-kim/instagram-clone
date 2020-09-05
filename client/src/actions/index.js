import axios from 'axios'

export const SET_USER = 'SET_USER'
export const LOAD_USER = 'LOAD_USER'

const setUser = user => ({
    type: SET_USER,
    user,
})

const loadUser = () => ({
    type: LOAD_USER,
})

export const getUser = (force = false) => {
    return async (dispatch, getState) => {
        const { user, profile } = getState()
        if (!force && user.loaded) return

        dispatch(loadUser())

        try {
            const res = await axios.get('/me')
            dispatch(setUser(res.data.user))

            console.log(user.user.username, profile.profile.username)
            if (user.user.username === profile.profile.username)
                dispatch(setProfile(res.data.user))
        } catch (err) {
            // do nothing
        }
    }
}

export const updateUser = user => {
    return async (dispatch) => {
        try {
            await axios.put('/me', user)
            dispatch(getUser(true))
        } catch (err) {
            // do nothing
        }
    }
}

export const updateProfilePic = formData => {
    return async (dispatch) => {
        try {
            await axios.put('/me', formData, {
                headers: { 'content-type': 'multipart/form-data' },
            })
            dispatch(getUser(true))
        } catch (err) {
            // do nothing
        }
    }
}

export const SET_PROFILE = 'SET_PROFILE'
export const LOAD_PROFILE = 'LOAD_PROFILE'

const setProfile = profile => ({
    type: SET_PROFILE,
    profile,
})

const loadProfile = () => ({
    type: LOAD_PROFILE
})

export const getProfile = (username, force = false) => {
    return async (dispatch, getState) => {
        const { profile } = getState()
        if (!force && profile.loaded) return

        dispatch(loadProfile())

        try {
            const res = await axios.get(`/user/${username}`)
            dispatch(setProfile(res.data.user))
        } catch (err) {
            // do nothing
        }
    }
}
