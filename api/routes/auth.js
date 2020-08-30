const express = require('express')
const passport = require('passport')

const router = express.Router()
const scope = ['email', 'profile']

router.get('/google', passport.authenticate('google', { scope }))
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/google',
    successRedirect: '/',
}))
router.post('/local', passport.authenticate('local', {
    failureRedirect: '/login'
}))

module.exports = router
