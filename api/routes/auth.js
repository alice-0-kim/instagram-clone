const express = require('express')
const passport = require('passport')

const router = express.Router()
const scope = ['email', 'profile']

// Oauth Routes
router.get('/google',
    passport.authenticate('google', { scope }))
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google',
        successRedirect: '/',
    }))

module.exports = router
