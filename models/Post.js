import mongoose from 'mongoose';
const {Schema, model, Types} = mongoose;

const schema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    data: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'},
    author: {type: String, required: true},
})

export default model('Post', schema)