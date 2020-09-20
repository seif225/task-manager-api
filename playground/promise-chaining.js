require('../src/db/mongoose')
const User = require ('../src/models/user')
const Task = require ('../src/models/task')

//5f428846dfe2411b58ab8833

// User.findByIdAndUpdate('5f428846dfe2411b58ab8833' , {
//     age : 20
// }).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age :{$gte:25} } );
// }).then((users)=>{
//     console.log(users)
// }).catch((e)=>{
//     console.log(e)
// })

// Task.findByIdAndDelete('5f4291cdecc9e346d06a579a').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((tasks)=>{
//     console.log(tasks)
// }).catch((e)=>{
//     console.log(e);
// })
// const add = (a,b)=>{
//     return new Promise ((resolve , reject)=>{
//         setTimeout(()=>{resolve(a+b)},1500)
//     })
// }

// add(10,11).then((res)=>{
//     console.log(res)
// })

// const doWork = async ()=>{
// return await add(2,3);
// }

// doWork().then((res)=>{
//     console.log(res)
// })

const updateAgeAndCount = async (id , age)=>{
    await User.findByIdAndUpdate(id , {age:age});
    return await User.countDocuments({age:{$gte:20}});
    
}

updateAgeAndCount('5f428846dfe2411b58ab8833',20).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
});