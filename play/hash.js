const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//var message = 'i am first user';
var data ={
    id : 10
}
 var password = '123abc';
// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         var decoded = hash;
//         console.log(decoded);
//     })
// })

bcrypt.compare(password,'$2b$10$hXJAEZeVo6CAhTxvZL4WfudOT19Bdh/SadBAcWoWSj7jVgIuRq9iq',(err,res)=>{
console.log(res);
})

// var result = jwt.sign(data,'abcdef');
// console.log(result);