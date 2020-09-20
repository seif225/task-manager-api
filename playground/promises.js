const doWork = new Promise((resolve , reject) => {

setTimeout(()=>{
    reject('faks')
    //resolve('done')
} , 2000)

})


doWork.then((result)=>{
console.log(result)
}).catch((error)=>{
console.log(error)
})