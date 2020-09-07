const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
    {
        imageUrl: String,
        face: [],
        label: [],
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            username: String,
        },
        private: Boolean,
        categories: {},
    },
    { timestamps: true }
)

module.exports = mongoose.model('Image', imageSchema)
