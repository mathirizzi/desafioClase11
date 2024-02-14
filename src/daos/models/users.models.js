import mongoose from "mongoose";

const usersCollection = 'users'

const usersSchema = new mongoose.Schema({
    first_name: {
       type: String,
       required: true
    },
    last_name: {
        type: String,
        required: true
     },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

const userModel = mongoose.model(usersCollection, usersSchema)

export default userModel;
