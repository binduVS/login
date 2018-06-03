const {login} =require('./server.js');

var authenticate = function(req,res,next){
    var token = req.header('x-auth');
    console.log(token);
    login.findByToken(token).then((user)=>{
        if(!user){
           return res.status(401)
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e)=>{
        res.status(401);
    })
}
module.exports = {
    authenticate
}