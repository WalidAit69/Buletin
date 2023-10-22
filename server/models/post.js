import mongoose, { Schema } from 'mongoose';

const PostSchema = new mongoose.Schema({
    title:{type:String , min:5},
    summary:{type:String , min:10},
    topic:{type:String},
    read:{type:String},
    content:{type:String , min:20},
    cover:String,
    author:{type:Schema.Types.ObjectId,ref:'User'},
},{
    timestamps:true,
})

const PostModel = mongoose.model('Post' , PostSchema);

export default PostModel;