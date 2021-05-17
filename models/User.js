import mongoose from 'mongoose';
const {Schema, model, Types} = mongoose;

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{ type: Types.ObjectId, ref: 'Post' }]
})

export default model('User', schema)