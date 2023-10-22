import mongoose, { Schema } from "mongoose";


const storySchema = new mongoose.Schema({
    cover:String,
    author:{type:Schema.Types.ObjectId,ref:'User'},
},{
    timestamps:true,
})

const storyModel = mongoose.model('story' ,storySchema);


export default storyModel;