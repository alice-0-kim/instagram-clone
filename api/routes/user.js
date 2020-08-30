const express = require('express')

const router = express.Router()
const UserCtrl = require('../controllers/user')

/* GET users listing. */
router.post('/user', UserCtrl.createUser)
router.put('/user/:id', UserCtrl.updateUser)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/user/:id', UserCtrl.getUserById)
router.get('/users', UserCtrl.getUsers)

module.exports = router
