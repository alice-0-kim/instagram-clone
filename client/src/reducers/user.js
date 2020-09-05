import { SET_USER, LOAD_USER } from '../actions'
import { defaultState } from './helper'

export default (state = defaultState, action) => {
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
        default:
            return state
    }
}
