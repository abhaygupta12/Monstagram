const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type :String,
        require:true
    },
    body:{
        type :String,
        require:true    
    },
    image:{
        type :String,
        require:true   
    },
    likes:[
        {
            type :String,
            ref: "UserModel" 
        }
    ],
    comments: [
        {
            commentText: String,
            commentedBy: { type: ObjectId, ref: "UserModel" }
        }
    ],
    
    author:{
        type:ObjectId,
        ref: "UserModel"
    }
})

mongoose.model("PostModel",postSchema);