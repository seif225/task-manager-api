const express = require('express')
const router = new express.Router()
const Task = require('../src/models/task.js')
const mongodb = require('mongodb')
const auth = require('../middleware/auth.js')
const User = require('../src/models/user.js')



router.post('/task',auth , async (req,res)=>{
   
    const task = new Task({
        //the following shorthand syntax is to
        //spread all the body data into this object!
        //ths is called spread operator
        ...req.body,
        owner : req.user._id
    })

    try{
        await task.save()  
        res.status(201).send( task)
    }
    catch(e){
        res.status(400).send(e);
    }
    
})


//GET /tasks?completed=fasle mslan y3ne :D 
//GET /task?limit=10 &skip =0 pagination :D 
router.get('/task',auth, async (req,res)=>{
 const match = {}
 const sort ={}
 if(req.query.sort) sort = req.query.sort==='true' 
console.log(match)
//getting the object in which we are going to sort with
//gettings also desc or asc
if(req.query.sortBy) {
     const parts = req.query.sortBy.split(':')
   // console.log(parts)
  
    sort[parts[0]] = parts[1] ==='desc' ? -1:1
    console.log(sort)
   
}
    try{
        const user= await req.user.populate({
            path : 'tasks',
            match,
            options : {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        console.log(user.tasks)
        res.status(201).send(user.tasks)
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
       }
    
  
})  
   

router.get('/task/:id' ,auth ,async (req , res)=>{
    const _id = req.params.id;
    try{
            const task = await Task.findOne({_id , owner : req.user._id});
           if(task) return res.status(201).send(task)
           return res.status(404).send({error : 'this task doesnt exist'});
    }
    catch(e){
        return res.status(404).send(e);
    }
   
})


router.patch('/tasks/:id',auth ,async (req , res)=>{
    const id = req.params.id
    const user = req.body
    const updates = Object.keys(req.body)
    try{
        const taskExists = await Task.exists(new mongodb.ObjectID(id))

       if (taskExists)
       {
       // const updatedUser = await Task.findByIdAndUpdate(id , user , {runValidators: true , new :true})
       const updatedTask = await Task.findOne({_id:id , owner:req.user._id});
       if(!updatedTask) return res.status(404).send()
       updates.forEach((update)=>{
           updatedTask[update] = req.body[update]
       })
       await updatedTask.save()

       res.status(201).send(updatedTask)}
        else {
           return res.status(404).send("task doesn't exist")
        }
    }
    catch(e){
        res.status(500).send(e)
        console.log(e)
        throw e

    }

})



router.delete('/tasks/:id' , auth , async(req,res)=>{
   try{ const taskId= req.params.id;
    const task = await Task.findOne({_id:taskId , owner : req.user._id})
    if(!task) return res.status(404).send()
    await Task.findByIdAndDelete(taskId)
    res.status(201).send()
}
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})


module.exports = router;