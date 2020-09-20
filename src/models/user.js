const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
var uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const Task = require('../models/task.js')
//var uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
    name:{type:String
    , required : true ,
   
    },
    password : {
        type:String,
        required:true,
        trim:true,
        minLength:6,
        validate(value){
            if(value.length<6 || (value.toLowerCase().includes('password'))){
                throw new Error('invalid password');
            }
        }
    },
        age : {type:Number,
        default : 0,
    validate(value){
        if(value<0) throw new Error('invalid age value');
    }},
    email: {
        type: String,
        unique: true,
        required:true,
        trim : true,
    
    validate(value){
        if(!validator.isEmail(value.trim()))
        {
            throw new Error('invalid email')
        }
    }
    },
    tokens : [{
       token : {
           type : String,
           required : true
       } 
    }],
    avatar : {
       type : Buffer 
    }
    
},
{
    timestamps:true
})

userSchema.plugin(uniqueValidator)

userSchema.virtual('tasks',{
    ref : 'Task',
    localField:'_id',
    foreignField :'owner'
})


//when turning the js object into json object to send it 
// to the api , the method will be called
//this method is overridden
userSchema.methods.toJSON =  function (){
        const user = this
        const userObject = user.toObject();
        delete userObject.password
        delete userObject.tokens
        delete userObject.avatar
        return userObject
}

//statics for *User* with uppercase U , for the class itself
//where methods are made for user which is the object
userSchema.methods.generateAuthToken = async function(){
    const user = this 
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token;


}

userSchema.statics.findByCredentials = async (email , password)=>{
try{  
     const user = await User.findOne({email})
     if(!user) throw new Error('this email doesnt exist');

     const isMatch = await bcrypt.compare(password ,user.password );
     if(!isMatch){
          throw Error('wrong password')
     }
return user 

    }
catch(e){
    throw e
}

}


//mongoose middleware methods [validate , *save* , remove , init]
//monogoose middleware functions has a pre and post functions
//in the case below we use 'save' with pre() , which means that
//this  code will be excuted before saving the user into the database
//Hash the plain text passowrd before savning
userSchema.pre('save' , async function (next){
    const user = this;
     console.log('just before saving !')
  
  //is modified return true of the user is created
  // for the first time or updated
  //isModififed = existes :D 
     if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
   // console.log('passowrd hashed')
    next()

})

userSchema.pre('remove' , async function(next){
    const user =this 
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;