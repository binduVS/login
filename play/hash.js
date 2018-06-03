const jwt = require('jsonwebtoken');

//var message = 'i am first user';
var data ={
    id : 10
}
var result = jwt.sign(data,'abcdef');
console.log(result);