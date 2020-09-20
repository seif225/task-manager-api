const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description : {type:String,
    required:true,
    
    },
    owner :{
        type : mongoose.Schema.Types.ObjectId ,
        required : true,
        ref : 'User' 
    }
    ,
    completed: {
        type: Boolean , 
        default : false}
},{
    timestamps:true
})

const Task = mongoose.model('Task' ,taskSchema);


module.exports = Task;