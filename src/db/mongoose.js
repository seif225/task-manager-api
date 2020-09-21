const mongoose = require('mongoose');
//const validator = require('validator');

mongoose.connect('mongodb+srv://taskapp:Seif2251997@task-manager-cluster.mbllo.mongodb.net/task_manager_api?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

