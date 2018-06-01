const {login} =require('./server.js');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const app  = express();
const _ = require('lodash');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://bindu:admin@ds133630.mlab.com:33630/user');
//mongoose.connect('mongodb://localhost:27017/TodoApp')mongodb://bindu:admin@ds133630.mlab.com:33630/user
app.post('/user',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var user = new login(body);
    //user.generateAuthToken();
    //console.log(doc);
    user.save().then(()=>{
        console.log(user);
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        console.log('token was nt passed',e)
    })
    })
app.listen(3000,()=>[
    console.log('connected')
]);

