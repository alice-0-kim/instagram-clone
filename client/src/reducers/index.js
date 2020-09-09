import { combineReducers } from 'redux'
import image from './image'
import profile from './profile'
import user from './user'

export default combineReducers({
    image,
    profile,
    user,
})
