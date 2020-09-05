import { SET_USER, LOAD_USER, USER_NOT_FOUND } from '../actions'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: action.user,
            }
        case LOAD_USER:
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
