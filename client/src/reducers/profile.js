import { SET_PROFILE, LOAD_PROFILE, USER_NOT_FOUND } from '../actions'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                loading: false,
                loaded: true,
                profile: action.profile,
            }
        case LOAD_PROFILE:
            return {
                ...state,
                loading: true,
                loaded: false,
            }
        case USER_NOT_FOUND:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
