const express = require('express')
const router = new express.Router()
const User = require('../src/models/user.js')
const mongodb = require('mongodb')
const auth = require('../middleware/auth.js')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail}  = require('../src/emails/account.js')

//sendWelcomeEmail('00','Masry')

//login route
router.post('/users/login',async (req,res)=>{

    try{
        const user = await User.findByCredentials(req.body.email , req.body.password);
        const token = await user.generateAuthToken()
        res.send({user , token})
        //console.log)
    }
    catch(e){
        console.log(e)
        res.status(400).send( {
            error : "unable to login"
        });
    }
    })



//sign up    
router.post('/users' ,async (req , res)=>{
   
    const user = new User(req.body);
        try
        {
            await user.save()
            sendWelcomeEmail(user.email,user.name)
             user.generateAuthToken();
             res.send('saved new user \n' +user )
        }
        catch(e){
            res.status(400).send(e )
        }
    }
    )

    const upload = multer({  
        limit : { fileSize : 10000000},
        fileFilter (req,file,cb){
            if(!file.originalname.match(/\.(png|jpg|jpeg)$/))
            return cb(new Error('file must be an image'))
            cb(undefined , true)
        } 
    })

   
    //upload profile pics 
    router.post('/users/me/avatar',auth ,upload.single('upload') , async (req,res)=>{
       //console.log('main middleware')
      const imageSource=  req.file.buffer;
      const image = await sharp(imageSource).resize({width :250 , height:250}).png().toBuffer();
        req.user.avatar = image
       await req.user.save()
        res.status(200).send()
    },(error,req,res,next) =>{
        //console.log('second middleware')
        res.status(400).send({error : error.message})
    })

    //get profile pic by id
    router.get('/users/:id/avatar',async (req,res)=>{
        const userId = req.params.id;
     try{
            const user = await User.findById(userId)
            if(!user || !user.avatar) {
                throw new Error('this user image doesnt exit !' )
            }

            res.set('Content-Type','image/png')
            res.send(user.avatar)
     }
     catch(e){
        res.send(e.message)
     }

    })

   

    router.delete('/users/me/avatar',auth,async (req , res)=>{
        try 
        { req.user.avatar=undefined
        await req.user.save()
            res.status(200).send('deleted successfully')
    }
        catch(error){}
        res.status(400).send({error : error.message})
    })
    
    
    router.get('/users/me',auth ,async (req , res)=>{
     res.status(200).send(req.user)
    }) 
    
    router.get('/users/:id' , async (req , res)=>{
        const id = req.params.id
        
       try{
        const user = await User.findById(id);
        if(user) return res.status(201).send(user)
        res.status(404).send();
        }
        catch(e){
        res.status(500).send(e);}
    })


    router.post('/users/logout',auth , async (req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter((token=>{
                return token.token!== req.token
            }))
            await req.user.save()
            res.send('logged out')
        }
        catch(e){
            console.log(e)
                res.status(500).send(e)
        }
    })

    router.post('/users/logoutAll', auth , async (req , res)=>{
        try {
           req.user.tokens = []
           await req.user.save()
           res.send('logged out successfully')
        }
        catch(e){
            console.log(e)
            res.status(500).send(e);

        }
    })
    
    
    router.patch('/users/me', auth ,async (req , res)=>{
        const id = req.user._id;
        const updates = Object.keys(req.body);
        try{
        const userExist = await User.exists(new mongodb.ObjectID(id));
    
        if(userExist){
            //const updatedUser = await User.findByIdAndUpdate(id)
            updates.forEach((update)=>
             req.user[update] = req.body[update])
            await req.user.save()
            res.send(req.user)
        }
        else {
            res.status(404).send('user doesnt exist')
        }
    }
    
        catch(e){
            console.log(e)
          res.status(400).send(e)
        } 
    })
    
    
    router.delete('/users/me' ,auth , async (req , res)=>{
        const id = req._id
        try{
         
               await req.user.remove()
                res.status(201).send('user deleted : \n' + req.user)
         
        }
        catch(e){
            res.status(500).send(e)
        }
    
    });
    


module.exports = router