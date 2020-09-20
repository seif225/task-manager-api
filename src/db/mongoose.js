const mongoose = require('mongoose');
//const validator = require('validator');

mongoose.connect(process.env.MONGOOSE_API,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

