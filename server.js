const mongodb = require('mongodb');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const _ = require('lodash');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app  = express();
app.use(bodyParser.json());
var Userschema = new mongoose.Schema({
    email :{
        type: String,
        required: true,
        trim : true,
        minlenght : 1,
        unique : true,
        validate :{
        validator :validator.isEmail,
        message : `{value} is not valid`
        }
    },
    password:{
        type : String,
        required : true,
    },
    tokens:[{
        access :{
            type : String,
            required :true
        },
        token :{
            type : String,
            required :true
        }
   }]
})
Userschema.methods.toJSON = function(){
    var user = this;
    var userobject = user.toObject();
    return _.pick(userobject,['_id','email']);
}
Userschema.methods.generateAuthToken = function(){
      var user = this;
      console.log("the user is",user)
      var access = "auth";
      var token = jwt.sign({_id : user._id.toHexString(), access},"abcd789").toString();
      user.tokens = user.tokens.concat([{access,token}]);
      //user.tokens.push({access,token});
      return user.save().then(()=>{
         return token;
      }).catch((e)=>{
          console.log('Inable to save');
      })
}
Userschema.statics.findByToken = function(token){
     var login = this;
    var decoded;
    try{
      decoded = jwt.verify(token ,'abcd789')
    }catch(e){
      res.status(401);
    }
    return login.findOne({
        "_id":decoded._id,
        "tokens.token":token,
        "tokens.access":"auth"
    })
}
Userschema.pre('save',function(next){
    var user = this;
if(user.isModified('password')){
 bcrypt.genSalt(10,(err,salt)=>{
     bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password = hash;
        next();
     })
 })
}else{
next();
}
})
var login = mongoose.model('login',Userschema);
module.exports={
    login
}


/*app.post('/user',(req,res)=>{
    var body =_.pick(req.body,['email','password']);
  
      var user = new login(body);
      console.log(user);
    user.save().then((doc)=>{
        if(!doc){
            return console.log('unable to save')
        }
        res.send(doc);
    },
    (e)=>{
          console.log('unable to save',e)
    })
})

app.listen(5000,()=>[
    console.log('connected')
]);
*/
