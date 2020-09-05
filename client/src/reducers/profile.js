import { SET_PROFILE, LOAD_PROFILE } from '../actions'
import { defaultState } from './helper'

export default (state = defaultState, action) => {
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
        default:
            return state
    }
}
