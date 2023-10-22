import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullname:{type:String , required:true , min:4 , unique:false},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true , unique:false},
    profile:String,
    cover:String,
    website:{type:String , required:false},
    bio:{type:String , required:false},
    job:{type:String , required:false},
    altemail:{type:String , required:false},
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

 
const UserModel = mongoose.model('User' , UserSchema);

export default UserModel;