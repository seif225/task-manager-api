//CRUD create read update delete  
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl ,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(error , client)=>{
    if(error){
       return console.log('unable to connect to database!');
    }

console.log('connected correctly');
const db =client.db(databaseName);





db.collection('users').deleteMany({
    age: {$lte:23}
}).then((npmres)=>console.log(res)).catch((err)=>console.log(err))



// db.collection('tasks').updateMany({
//     description :'des 1'
// },{
//     $set:{
//         completed : false
//     }
// },).then((res)=>{
// console.log(res.modifiedCount);
// }).catch((err)=>{
// console.log(err);
// })




// db.collection('users').find({name :'seif',age:{$gte:5} },(err , res)=>{

//     if(error) return console.log('unable to fetch data from mongodb');
//     res.toArray((err,arr)=>{
//             console.log(arr);
//     })
// });

// const updatePromise = db.collection('users').updateOne({
//     _id: new mongodb.ObjectID('5f3c198635ce9e21b02c56ae')
// },{
//     $inc:{
//         age : 1
//     }
// });


// updatePromise.then((res)=>{
   
//         console.log(res);
    
// }).catch((error)=>{
// console.log(error);
// })

// db.collection('tasks')
// .find({completed : false})
// .toArray((err , res)=> console.log(res))

//console.log(new mongodb.ObjectID().getTimestamp())

// db.collection('users').insertOne({
//     name:'leo adams',
//     age : 23
// } , (err , res)=>{

//     if(error){
//         return console.log('unable to insert user');
//     }
//     console.log(res.ops);


// });

//console.log(db.getCollection('users').find({}));

// db.collection('users').insertMany([
//     {
//         name:'jen',
//         age:28
//     },{
//         name:'randa',
//         age:18

//     }
// ],(error , res)=>{
//     if(error) return console.log('unable to insert document');
//     console.log(res.ops)
// });


// db.collection('tasks').insertMany([
//     {
//         description: 'do something 1 ' ,
//         completed : true
//     }
// ],(err,res)=>{
//     if(err)return console.log('failed to insert this doc');
//     console.log(res.ops);
// });
});
