const mongoose = require('mongoose')
const schema = mongoose.Schema
const userschema = new schema({
    userId:{
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    },
    updated:{
        type: Date,
        required: true
    },
    active:{
        type: Boolean, 
        default: true
    }
})