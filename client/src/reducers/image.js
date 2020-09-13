import {
    LOADING, SUCCESS, FAILURE, SET,
} from '../actions'

export default (state = { loading: false, success: true }, action) => {
    switch (action.type) {
    case LOADING:
        return {
            ...state,
            loading: true,
        }
    case SUCCESS:
        return {
            ...state,
            loading: false,
            success: true,
        }
    case FAILURE:
        return {
            ...state,
            loading: false,
            success: false,
            error: action.error,
        }
    case SET:
        return {
            ...state,
            images: action.images,
        }
    default:
        return state
    }
}
