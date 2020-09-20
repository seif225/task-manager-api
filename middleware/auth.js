const jwt = require('jsonwebtoken')
const User = require('../src/models/user.js')

const auth = async(req , res , next)=>{
console.log('auth middleware:')

try{
    const token = req.header('Authorization').replace('Bearer ' ,'');
    console.log('token: '+token)
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findOne({_id:decoded._id, 'tokens.token':token})
    console.log(decoded)

    if(!user){
        throw new Error ()
    }

    // res.status(200).send(user)
    req.token = token;
    req.user =user
    next()
}
catch(e){
    res.status(401).send({error : 'please authenticate.'})
}
//next in catch causes Error !! 
//next()
}

module.exports = auth;