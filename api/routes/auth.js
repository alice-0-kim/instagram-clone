const express = require('express')
const passport = require('passport')

const router = express.Router()
const scope = ['email', 'profile']

router.get('/google', passport.authenticate('google', { scope }))
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/google'
}), (req, res) => {
    if (req.user?.username) res.redirect(`/${req.user?.username}`)
    else res.redirect('/set')
})
router.post('/local/new', passport.authenticate('new'))
router.post('/local/login', passport.authenticate('login'))

module.exports = router
