const User = require('../models/user')
const { ObjectId } = require('./util')

createUser = async (req, res) => {
    const { body } = req

    if (!body) {
        return res.status(400).json({
            succcess: false,
            error: 'You must provide an user',
        })
    }

    const user = new User(body)
    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }
    try {
        await user.save()
        return res.status(201).json({
            success: true,
            id: user._id,
            message: 'User created!',
        })
    } catch (err) {
        return res.status(400).json({
            error,
            message: 'User not created!',
        })
    }
}

updateUser = (req, res) => {
    const user = req.body

    if (!user) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findByIdAndUpdate(ObjectId(req.params.id), user, (err, user) => {
        if (!user) {
            return res.status(404).json({ err, message: 'User not found!' })
        }
        return res.status(200).json({ success: true, id: user._id, message: 'User updated!' })
    })
}

deleteUser = (req, res) => {
    User.findByIdAndDelete(ObjectId(req.params.id), (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => err)
}

getUserById = (req, res) => {
    User.findOne({ username: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' })
        }
        return res.status(200).json({ success: true, user })
    }).catch(err => err)
}

getUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res.status(404).json({ success: false, error: 'User not found' })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => err)
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
}
